import API from './api';

const loadMyCalendar = params =>
  API.add({
    method: 'POST',
    endPoint: 'mycalendar/loadMyCalendar',
    payload: params,
    useAuth: true
  });

const cancelAppointment = params =>
  API.add({
    method: 'POST',
    endPoint: 'mycalendar/cancelAppointment',
    payload: params,
    useAuth: true
  });

const sendAppointmentFeedback = params =>
  API.add({
    method: 'POST',
    endPoint: 'mycalendar/sendAppointmentFeedback',
    payload: params,
    useAuth: true
  });

const getAppointmentMessage = params =>
  API.add({
    method: 'POST',
    endPoint: 'mycalendar/getAppointmentMessage',
    payload: params,
    useAuth: true
  });

const MyCalendarApi = {
  loadMyCalendar,
  cancelAppointment,
  sendAppointmentFeedback,
  getAppointmentMessage
};

export default MyCalendarApi;
