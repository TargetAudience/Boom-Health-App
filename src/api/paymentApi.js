import API from './api';

const cancelTransaction = params =>
  API.add({
    method: 'POST',
    endPoint: 'purchases/cancelTransaction',
    payload: params,
    useAuth: false
  });

const payRemainingMyself = params =>
  API.add({
    method: 'POST',
    endPoint: 'purchases/payRemainingMyself',
    payload: params,
    useAuth: true
  });

const paymentSplitRemaining = params =>
  API.add({
    method: 'POST',
    endPoint: 'purchases/paymentSplitRemaining',
    payload: params,
    useAuth: true
  });

const processPayment = params =>
  API.add({
    method: 'POST',
    endPoint: 'purchases/processPayment',
    payload: params,
    useAuth: true
  });

const processPreAuths = params =>
  API.add({
    method: 'POST',
    endPoint: 'purchases/processPreAuths',
    payload: params,
    useAuth: true
  });

const addPromoCode = params =>
  API.add({
    method: 'POST',
    endPoint: 'purchases/addPromoCode',
    payload: params,
    useAuth: true
  });

const processSubscription = params =>
  API.add({
    method: 'POST',
    endPoint: 'purchases/processSubscription',
    payload: params,
    useAuth: true
  });

const PaymentApi = {
  cancelTransaction,
  payRemainingMyself,
  paymentSplitRemaining,
  processPayment,
  processPreAuths,
  addPromoCode,
  processSubscription
};

export default PaymentApi;
