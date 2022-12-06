import API from './api';

const getServices = () =>
  API.add({
    method: 'GET',
    endPoint: 'bookCaregivers/getServices',
    payload: null,
    useAuth: false
  });

const caregiverType = params =>
  API.add({
    method: 'POST',
    endPoint: 'bookCaregivers/caregiverType',
    payload: params,
    useAuth: false
  });

const requestCaregiver = params =>
  API.add({
    method: 'POST',
    endPoint: 'bookCaregivers/requestCaregiver',
    payload: params,
    useAuth: true
  });

const BookCaregiversApi = {
  getServices,
  caregiverType,
  requestCaregiver
};

export default BookCaregiversApi;