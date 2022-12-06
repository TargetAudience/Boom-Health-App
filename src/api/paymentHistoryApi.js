import API from './api';

const getPaymentHistory = () =>
  API.add({
    method: 'GET',
    endPoint: 'paymentHistory/getPaymentHistory',
    payload: null,
    useAuth: true
  });

const PaymentHistory = {
  getPaymentHistory
};

export default PaymentHistory;
