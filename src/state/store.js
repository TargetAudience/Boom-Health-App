import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './ducks';

const middlewares = [];
middlewares.push(promiseMiddleware);
middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger({
    diff: false,
    collapsed: false
  });
  middlewares.push(loggerMiddleware);
}

const persistConfig = {
  timeout: 10000,
  key: 'root',
  debug: true,
  whitelist: ['auth', 'profile', 'settings', 'pubnub'],
  storage: AsyncStorage
}

const configureStore = () => {
  const createStoreWithMiddleware = compose(applyMiddleware(...middlewares))(
    createStore
  );
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStoreWithMiddleware(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};

const { store, persistor } = configureStore();

export { store, persistor };
