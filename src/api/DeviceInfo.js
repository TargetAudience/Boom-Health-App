import DeviceInfo from 'react-native-device-info';

export function getBrand() {
  return DeviceInfo.getBrand();
}

export function getModel() {
  return DeviceInfo.getModel();
}
