import { all, takeLatest, call, put } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure, signInRequest } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    yield put(signFailure());
    Alert.alert('Authentication failed', 'Please, verify your data.');
  }
}
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', { name, email, password });
    Alert.alert('Account successfully created!');
    yield put(signInRequest(email, password));
  } catch (err) {
    yield put(signFailure());
    Alert.alert('Sign up failed', 'Please, verify your data.');
  }
}

function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
