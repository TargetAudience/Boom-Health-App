import API from './api';

const loadTodaysAppointments = params =>
  API.add({
    method: 'POST',
    endPoint: 'mycalendar/loadTodaysAppointments',
    payload: params,
    useAuth: true
  });

const TodaysAppointmentsApi = {
  loadTodaysAppointments
};

export default TodaysAppointmentsApi;
