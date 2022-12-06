import API from './api';

const getServices = () =>
  API.add({
    method: 'GET',
    endPoint: 'caregiverServices/getServices',
    payload: null,
    useAuth: true
  });

const addService = params =>
  API.add({
    method: 'POST',
    endPoint: 'caregiverServices/addService',
    payload: params,
    useAuth: true
  });

const removeService = params =>
  API.add({
    method: 'POST',
    endPoint: 'caregiverServices/removeService',
    payload: params,
    useAuth: true
  });
  
const CaregiverMySerivcesApi = {
  getServices,
  addService,
  removeService
};

export default CaregiverMySerivcesApi;
