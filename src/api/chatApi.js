import API from './api';

const getRooms = params =>
  API.add({
    method: 'POST',
    endPoint: 'chat/getRooms',
    payload: params,
    useAuth: true
  });

const getChats = params =>
  API.add({
    method: 'POST',
    endPoint: 'chat/getChats',
    payload: params,
    useAuth: true
  });

const leaveChat = params =>
  API.add({
    method: 'POST',
    endPoint: 'chat/leaveChat',
    payload: params,
    useAuth: true
  });

const addToChat = params =>
  API.add({
    method: 'POST',
    endPoint: 'chat/addToChat',
    payload: params,
    useAuth: true
  });

const removeFromChat = params =>
  API.add({
    method: 'POST',
    endPoint: 'chat/removeFromChat',
    payload: params,
    useAuth: true
  });

const getChatMembers = params =>
  API.add({
    method: 'POST',
    endPoint: 'chat/getChatMembers',
    payload: params,
    useAuth: true
  });

const ChatApi = {
  getRooms,
  getChats,
  leaveChat,
  addToChat,
  removeFromChat,
  getChatMembers
};

export default ChatApi;
