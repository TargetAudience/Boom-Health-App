import API from './api';

const addTask = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/addTask',
    payload: params,
    useAuth: true
  });

const editTask = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/editTask',
    payload: params,
    useAuth: true
  });

const getPeople = params =>
  API.add({
    method: 'GET',
    endPoint: 'tasks/getPeople',
    payload: params,
    useAuth: true
  });

const getTasks = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/getTasks',
    payload: params,
    useAuth: true
  });

const checkUncheck = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/checkUncheck',
    payload: params,
    useAuth: true
  });

const removeTask = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/removeTask',
    payload: params,
    useAuth: true
  });

const addPerson = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/addPerson',
    payload: params,
    useAuth: true
  });

const updatePerson = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/updatePerson',
    payload: params,
    useAuth: true
  });

const dischargeNurseLink = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/dischargeNurseLink',
    payload: params,
    useAuth: true
  });

const settingsUpdate = params =>
  API.add({
    method: 'POST',
    endPoint: 'tasks/settingsUpdate',
    payload: params,
    useAuth: true
  });

const getSettings = params =>
  API.add({
    method: 'GET',
    endPoint: 'tasks/getSettings',
    payload: params,
    useAuth: true
  });

const TasksApi = {
  addTask,
  getPeople,
  getTasks,
  checkUncheck,
  removeTask,
  editTask,
  addPerson,
  updatePerson,
  dischargeNurseLink,
  settingsUpdate,
  getSettings,
};

export default TasksApi;
