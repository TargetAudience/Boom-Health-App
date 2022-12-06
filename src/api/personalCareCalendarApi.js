import API from './api';

const loadCalendar = params =>
  API.add({
    method: 'POST',
    endPoint: 'personalCareCalendar/loadCalendar',
    payload: params,
    useAuth: true
  });

const updateServiceRange = params =>
  API.add({
    method: 'POST',
    endPoint: 'personalCareCalendar/updateServiceRange',
    payload: params,
    useAuth: true
  });

const PersonalCareCalendarApi = {
  loadCalendar,
  updateServiceRange
};

export default PersonalCareCalendarApi;
