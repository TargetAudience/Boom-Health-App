import API from './api';

const getEquipmentCurrentlyRented = () =>
  API.add({
    method: 'GET',
    endPoint: 'home/getEquipmentCurrentlyRented',
    payload: null,
    useAuth: true
  });

const HomeApi = {
    getEquipmentCurrentlyRented
};

export default HomeApi;
