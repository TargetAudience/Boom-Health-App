import API from './api';

const getPatientInformation = params =>
  API.add({
    method: 'GET',
    endPoint: 'profile/getPatientInformation',
    payload: params,
    useAuth: true
  });

const getPatientNeeds = params =>
  API.add({
    method: 'GET',
    endPoint: 'profile/getPatientNeeds',
    payload: params,
    useAuth: true
  });

const sendContactUs = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/sendContactUs',
    payload: params,
    useAuth: true
  });

const addFeedback = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/addFeedback',
    payload: params,
    useAuth: true
  });

const removeCustomAddress = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/removeCustomAddress',
    payload: params,
    useAuth: true
  });

const addCustomAddress = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/addCustomAddress',
    payload: params,
    useAuth: true
  });

const getCustomAddresses = params =>
  API.add({
    method: 'GET',
    endPoint: 'profile/getCustomAddresses',
    useAuth: true
  });

const updatePushToken = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updatePushToken',
    payload: params,
    useAuth: true
  });

const changeEmailAddress = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/changeEmailAddress',
    payload: params,
    useAuth: true
  });

const changePassword = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/changePassword',
    payload: params,
    useAuth: true
  });

const updateRegister = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updateRegister',
    payload: params,
    useAuth: true
  });

const sendPhoto = (params, onUploadProgress) =>
  API.sendImage({
    endPoint: `profile/sendPhoto?personType=${params.personType}`,
    payload: params,
    onUploadProgress,
    useAuth: true
  });

const removePhoto = () =>
  API.add({
    method: 'GET',
    endPoint: 'profile/removePhoto',
    payload: null,
    useAuth: true
  });

const updateProfile = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/update_profile',
    payload: params,
    useAuth: true
  });

const updateMyProfile = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updateMyProfile',
    payload: params,
    useAuth: true
  });

const updatePatientInformation = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updatePatientInformation',
    payload: params,
    useAuth: true
  });

const updatePatientNeeds = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updatePatientNeeds',
    payload: params,
    useAuth: true
  });

const addFamilyInvite = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/addFamilyInvite',
    payload: params,
    useAuth: true
  });

const updateFamilyMemberInvited = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updateFamilyMemberInvited',
    payload: params,
    useAuth: true
  });

const updateFamilyMember = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updateFamilyMember',
    payload: params,
    useAuth: true
  });

const getFamilyMembersPaymentCard = params =>
  API.add({
    method: 'GET',
    endPoint: 'profile/getFamilyMembersPaymentCard',
    useAuth: true
  });

const getFamilyMembers = params =>
  API.add({
    method: 'GET',
    endPoint: 'profile/getFamilyMembers',
    useAuth: true
  });

const removeFamilyInvited = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/removeFamilyInvited',
    payload: params,
    useAuth: true
  });

const blockFamilyMember = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/blockFamilyMember',
    payload: params,
    useAuth: true
  });

const defaultCard = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/defaultCard',
    payload: params,
    useAuth: true
  });

const addCard = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/addCard',
    payload: params,
    useAuth: true
  });

const removeCard = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/removeCard',
    payload: params,
    useAuth: true
  });

const getCards = params =>
  API.add({
    method: 'GET',
    endPoint: 'profile/getCards',
    useAuth: true
  });

const updateEmailNotifications = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updateEmailNotifications',
    payload: params,
    useAuth: true
  });

const updateSmsNotifications = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/updateSmsNotifications',
    payload: params,
    useAuth: true
  });
  
const disablePushNotifications = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/disablePushNotifications',
    payload: params,
    useAuth: true
  });

const testCrypto = params =>
  API.add({
    method: 'POST',
    endPoint: 'profile/testCrypto',
    payload: params,
    useAuth: true
  });

const ProfileApi = {
  getPatientInformation,
  getPatientNeeds,
  sendContactUs,
  addFeedback,
  removeCustomAddress,
  addCustomAddress,
  getCustomAddresses,
  updateEmailNotifications,
  updateSmsNotifications,
  disablePushNotifications,
  updatePushToken,
  changePassword,
  changeEmailAddress,
  updateRegister,
  sendPhoto,
  removePhoto,
  updateProfile,
  updateMyProfile,
  updatePatientInformation,
  updatePatientNeeds,
  addFamilyInvite,
  updateFamilyMemberInvited,
  updateFamilyMember,
  getFamilyMembers,
  getFamilyMembersPaymentCard,
  removeFamilyInvited,
  blockFamilyMember,
  addCard,
  removeCard,
  getCards,
  defaultCard,
  testCrypto
};

export default ProfileApi;
