import API from './api';

const setDefaultAvailability = params =>
  API.add({
    method: 'POST',
    endPoint: 'availability/setDefaultAvailability',
    payload: params,
    useAuth: true
  });

const getDefaultAvailability = () =>
  API.add({
    method: 'GET',
    endPoint: 'availability/getDefaultAvailability',
    payload: null,
    useAuth: true
  });

const addSpecificTime = params =>
  API.add({
    method: 'POST',
    endPoint: 'availability/addSpecificTime',
    payload: params,
    useAuth: true
  });

const setDailyNotAvailable = params =>
  API.add({
    method: 'POST',
    endPoint: 'availability/setDailyNotAvailable',
    payload: params,
    useAuth: true
  });

const loadAvailabilityCalendar = params =>
  API.add({
    method: 'GET',
    endPoint: 'availability/loadAvailabilityCalendar',
    useAuth: true
  });

const removeSpecificTime = params =>
  API.add({
    method: 'POST',
    endPoint: 'availability/removeSpecificTime',
    payload: params,
    useAuth: true
  });

const CaregiverAvailabilityApi = {
  setDefaultAvailability,
  getDefaultAvailability,
  addSpecificTime,
  setDailyNotAvailable,
  loadAvailabilityCalendar,
  removeSpecificTime
};

export default CaregiverAvailabilityApi;
