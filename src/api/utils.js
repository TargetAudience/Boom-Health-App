import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw new Error(error);
  }
};

export async function authHeader() {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return `Bearer ${token}`;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function errorHandler(params) {
  console.log('error')
  console.log(params)
  if (params) {
    const { status, data } = params;

    if (status === 401) {
      return { message: 'Authentication error.' };
    } else if (status === 403) {
      return { message: 'Forbidden.' };
    } else if (status === 404) {
      return { message: 'Invalid URL.' };
    } else if (status === 422) {
      const errorMessage = getAllValues(data.errors);
      return { message: errorMessage.join('\n') };
    } else if (status === 500) {
      return { message: 'Interal service error' };
    }
  }

  function getAllValues(obj) {
    let values = [];

    getProp(obj);

    function getProp(o) {
      for (var prop in o) {
        if (typeof o[prop] === 'object') {
          getProp(o[prop]);
        } else {
          values.push(o[prop]);
        }
      }
    }

    return values;
  }
}
