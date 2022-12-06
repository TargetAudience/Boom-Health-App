import { Platform } from 'react-native';
import { getBrand, getModel, getInstallReferrer } from './DeviceInfo';
import API from './api';

const  device = {
  brand: getBrand(),
  model: getModel()
};

const login = params => 
  API.add({
    method: 'POST',
    endPoint: 'login',
    payload: { ...params, ...device },
    useAuth: false
  });

const register = params =>
  API.add({
    method: 'POST',
    endPoint: 'register',
    payload: params,
    useAuth: false
  });

const registerProfile = params =>
  API.add({
    method: 'POST',
    endPoint: 'register/profile',
    payload: params,
    useAuth: true
  });

const forgotPassword = params =>
  API.add({
    method: 'POST',
    endPoint: 'forgotPassword/requestReset',
    payload: params,
    useAuth: false
  });

const changePassword = params =>
  API.add({
    method: 'POST',
    endPoint: 'login/changePassword',
    payload: params,
    useAuth: true
  });

const postalCodeLookup = params =>
  API.add({
    method: 'POST',
    endPoint: 'onboarding/postalCodeLookup',
    payload: params,
    useAuth: false
  });

const getVersion = () => 
  API.add({
    method: 'GET',
    endPoint: 'user/getVersion',
    useAuth: false
  });

const UserApi = {
  register,
  registerProfile,
  login,
  forgotPassword,
  changePassword,
  postalCodeLookup,
  getVersion
};

export default UserApi;
