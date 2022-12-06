import API from './api';

const makePurchase = params =>
  API.add({
    method: 'POST',
    endPoint: 'equipment/makePurchase',
    payload: params,
    useAuth: true
  });

const getMedicalEquipment = () =>
  API.add({
    method: 'GET',
    endPoint: 'equipment/getMedicalEquipment',
    payload: null,
    useAuth: false
  });

const cancelTransaction = params =>
  API.add({
    method: 'POST',
    endPoint: 'equipment/cancelTransaction',
    payload: params,
    useAuth: false
  });

const payRemainingMyself = params =>
  API.add({
    method: 'POST',
    endPoint: 'equipment/payRemainingMyself',
    payload: params,
    useAuth: true
  });

const paymentSplitRemaining = params =>
  API.add({
    method: 'POST',
    endPoint: 'equipment/paymentSplitRemaining',
    payload: params,
    useAuth: true
  });


const EquipmentApi = {
  makePurchase,
  getMedicalEquipment,
  cancelTransaction,
  payRemainingMyself,
  paymentSplitRemaining
};

export default EquipmentApi;
