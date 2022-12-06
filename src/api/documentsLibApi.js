import API from './api';

const emailDocument = params =>
  API.add({
    method: 'POST',
    endPoint: 'documentslib/emailDocument',
    payload: params,
    useAuth: true
  });

const getDocuments = () =>
  API.add({
    method: 'GET',
    endPoint: 'documentslib/getDocuments',
    payload: null,
    useAuth: true
  });

const sendDocument = (params, onUploadProgress) =>
  API.sendDocument({
    endPoint: 'documentslib/sendDocument',
    payload: params,
    onUploadProgress,
    useAuth: true
  });

const removeDocument = params =>
  API.add({
    method: 'POST',
    endPoint: 'documentslib/removeDocument',
    payload: params,
    useAuth: true
  });

const renameDocument = params =>
  API.add({
    method: 'POST',
    endPoint: 'documentslib/renameDocument',
    payload: params,
    useAuth: true
  });

const DocumentsLibApi = {
  getDocuments,
  emailDocument,
  sendDocument,
  removeDocument,
  renameDocument
};

export default DocumentsLibApi;
