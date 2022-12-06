import { combineReducers } from 'redux';

import auth from './auth';
import alert from './alert';
import profile from './profile';
import pubnub from './pubnub';
import settings from './settings';
import meals from './meals';
import equipment from './equipment';
import homePersonalCare from './homePersonalCare';
import caregiverAvailability from './caregiverAvailability';
import myCalendar from './myCalendar';
import todaysAppointments from './todaysAppointments';
import transportation from './transportation';

export default combineReducers({
  auth,
  alert,
  profile,
  pubnub,
  settings,
  meals,
  equipment,
  homePersonalCare,
  caregiverAvailability,
  myCalendar,
  todaysAppointments,
  transportation
});
