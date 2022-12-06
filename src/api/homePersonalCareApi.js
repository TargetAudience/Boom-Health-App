import API from './api';

const getCatalog = () =>
  API.add({
    method: 'GET',
    endPoint: 'homecare/getCatalog',
    payload: null,
    useAuth: false
  });

const loadPersonalCareAvailabilityCalendar = params =>
  API.add({
    method: 'POST',
    endPoint: 'booking/loadPersonalCareAvailabilityCalendar',
    payload: params,
    useAuth: false
  });

const loadAvailabilityDay = params =>
  API.add({
    method: 'POST',
    endPoint: 'booking/loadAvailabilityDay',
    payload: params,
    useAuth: true
  });

const makePurchase = params =>
  API.add({
    method: 'POST',
    endPoint: 'homecare/makePurchase',
    payload: params,
    useAuth: true
  });

const HomePersonalCareApi = {
  getCatalog,
  loadPersonalCareAvailabilityCalendar,
  loadAvailabilityDay,
  makePurchase
};

export default HomePersonalCareApi;
