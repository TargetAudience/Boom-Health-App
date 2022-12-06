import API from './api';

const makePurchase = params =>
  API.add({
    method: 'POST',
    endPoint: 'transportation/makePurchase',
    payload: params,
    useAuth: true
  });

const TransportationApi = {
  makePurchase
};

export default TransportationApi;
