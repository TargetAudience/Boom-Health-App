import API from './api';

const makePurchase = params =>
  API.add({
    method: 'POST',
    endPoint: 'meals/makePurchase',
    payload: params,
    useAuth: true
  });

const getPresetMeals = () =>
  API.add({
    method: 'GET',
    endPoint: 'meals/getPresetMeals',
    payload: null,
    useAuth: true
  });

const getWeeklyMenu = () =>
  API.add({
    method: 'GET',
    endPoint: 'meals/getWeeklyMenu',
    payload: null,
    useAuth: false
  });

const getDeliveryWeeks = () =>
  API.add({
    method: 'GET',
    endPoint: 'meals/getDeliveryWeeks',
    payload: null,
    useAuth: false
  });

const MealsApi = {
  makePurchase,
  getPresetMeals,
  getWeeklyMenu,
  getDeliveryWeeks
};

export default MealsApi;
