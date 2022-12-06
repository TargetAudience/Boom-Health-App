import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  create,
  CLIENT_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR,
  CONNECTION_ERROR,
  NETWORK_ERROR,
  CANCEL_ERROR
} from 'apisauce';
import { apiUrl } from '@lib/Settings';
import ReactNativeBlobUtil from 'react-native-blob-util';

const USER_TOKEN = '@usertoken';

const initialState = {
  baseUrl: '',
  queue: [],
  retry: 3000,
  setTokenExpired: null,
  token: ''
};

let state = initialState;
let api = null;

const setState = (st = initialState) => (state = st);

const createAPI = (apistate = initialState) => {
  setState(apistate);
  api = create({
    baseURL: apiUrl,
    headers: { Accept: 'application/json', 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' },
    timeout: 25000
  });
};

createAPI();

const sendImage = async msg => {
  const { payload, onUploadProgress } = msg;
  let { endPoint } = msg;

  endPoint += endPoint.indexOf('?') === -1 ? '?' : '&';

  const token = await AsyncStorage.getItem(USER_TOKEN);

  const options = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
    onUploadProgress
  };

  const sendPayLoad = new FormData();
  sendPayLoad.append('params', { uri: payload.imageUri, type: payload.fileType, name: payload.name });

  return new Promise((resolve, reject) => {
    const axio = api.post(endPoint, sendPayLoad, options);
    axio
      .then(response => {
        resolve(response.data);
      })
      .catch(error => console.log(error));
  });
};

const sendDocument = async msg => {
  const { payload, onUploadProgress } = msg;
  let { endPoint } = msg;

  endPoint += endPoint.indexOf('?') === -1 ? '?' : '&';

  const token = await AsyncStorage.getItem(USER_TOKEN);

  const realPath = Platform.OS === 'ios' ? payload.uri.replace('file://', '') : payload.uri;
  const encodedPath = decodeURIComponent(realPath);
  const finalURL = `${apiUrl}/documentsLib/sendDocument`;

  const response = await ReactNativeBlobUtil.fetch(
    'POST',
    finalURL,
    {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    [
      {
        name: 'params',
        filename: payload.name,
        data: ReactNativeBlobUtil.wrap(encodedPath)
      }
    ]
  ).uploadProgress({ interval: 100 }, (received, total) => {
    const data = {
      loaded: received,
      total
    };
    onUploadProgress(data);
  });

  console.log('response', response);
  return response;
};

const add = (msg, resume, retry = true) => {
  msg.retry = retry;
  msg.promise = new Promise((resolve, reject) => {
    state.queue.push({ resolve: resolve, reject: reject, msg: msg });
  });
  execute(msg);
  return msg;
};

const execute = async msg => {
  let response = await send(msg);
  // if (msg.retry === false) updateTimeout(DEFAULT_TIMEOUT);

  if (response.ok && response.data && response.status === 200) {
    handleSuccess(response, msg.endPoint);
    return;
  } else if (response.ok && response.data && response.status !== 200) {
    if (handleClientFail(response, msg.endPoint)) {
      return;
    }
  } else {
    if (handleFail(response, msg.endPoint)) {
      return;
    }
  }
};

const send = async msg => {
  let { method, payload, endPoint, useAuth, onUploadProgress } = msg;
  const sendPayLoad = { params: payload };

  const token = await AsyncStorage.getItem(USER_TOKEN);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    onUploadProgress
  };

  if (method === 'POST') {
    if (useAuth && token) {
      return api.post(endPoint, sendPayLoad, options);
    } else {
      return api.post(endPoint, sendPayLoad, {});
    }
  }

  if (method === 'GET') {
    if (useAuth && token) {
      endPoint += endPoint.indexOf('?') === -1 ? '?' : '&';
      endPoint += `token=${token}`;
    }
    return api.get(endPoint);
  }

  if (method === 'PUT') {
    return api.put(endPoint, sendPayLoad);
  }
  if (method === 'DELETE') {
    return api.delete(endPoint, sendPayLoad);
  }
};

const handleSuccess = async (response, endPoint) => {
  if (response.data && response.data.accessToken) {
    const accessToken = response.data.accessToken;
    await AsyncStorage.setItem(USER_TOKEN, accessToken);
  }
  const queueReqIdx = state.queue.findIndex(req => req.msg.endPoint === endPoint);

  state.queue[queueReqIdx].resolve(response);
  state.queue.splice(queueReqIdx, 1);
};

const handleClientFail = (response, endPoint) => {
  const queueReqIdx = state.queue.findIndex(req => req.msg.endPoint === endPoint);

  state.queue[queueReqIdx].reject(response);
  state.queue.splice(queueReqIdx, 1);

  return true;
};

const handleFail = (response, endPoint) => {
  const queueReqIdx = state.queue.findIndex(req => req.msg.endPoint === endPoint);

  console.log('handleFail', response);
  const { msg } = state.queue[queueReqIdx];

  switch (response.problem) {
    case CLIENT_ERROR:
    case SERVER_ERROR:
      console.log('Call failed, removing from queue ', state.queue[0].msg, response);
      // setRetry()

      state.queue[queueReqIdx].reject(response);
      state.queue.splice(queueReqIdx, 1);

      return true;

    case TIMEOUT_ERROR:
    case CONNECTION_ERROR:
    case NETWORK_ERROR:
    case CANCEL_ERROR:
      if (msg.retry === false) {
        // setRetry()
        state.queue[0].reject(response);
        state.queue.shift();
        return true;
      }
      // setRetry((state.retry * 2) > 8000 ? 8000 : (state.retry*2))
      if (msg.retryCount == null) {
        msg.retryCount = 1;
      } else if (msg.retryCount >= 5) {
        // setRetry()
        state.queue[0].reject(response);
        state.queue.shift();
        return true;
      } else {
        msg.retryCount++;
      }
      if ('onRetrying' in msg && typeof msg.onRetrying === 'function') {
        msg.onRetrying(msg.retryCount, response.problem, state.retry);
      }
    //console.log(response.problem + ' Call failed, retrying in ' + state.retry)
  }
  return false;
};

api.addRequestTransform(request => {
  console.log('request', request);
  console.log(
    `%cAPI REQUEST (${request.method.toUpperCase()} ${request.url}) PARAMS:`,
    'background: orange; color: white',
    request.data
  );
});

api.addResponseTransform(response => {
  if (response.ok === false) {
    const css = 'background: red; color: white';
    console.log(
      `%cAPI RESPONSE ${response.status} (${response.config.method.toUpperCase()} ${response.config.url} ${
        response.duration
      }ms) DATA:`,
      css,
      response.problem,
      response.data ? response.data : 'no data'
    );
  } else {
    const css = 'background: green; color: white';
    console.log(
      `%cAPI RESPONSE ${response.status} (${response.config.method.toUpperCase()} ${response.config.url} ${
        response.duration
      }ms) DATA:`,
      css,
      response.data
    );
  }
});

const API = {
  createAPI,
  add,
  sendImage,
  sendDocument
};

export default API;
