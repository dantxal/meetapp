import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { HOST } from '../util/hostConstant';

if (__DEV__) {
  const tron = Reactotron.configure({ host: HOST })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage) // stops Reactotron from creating new connection on every app reload
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
