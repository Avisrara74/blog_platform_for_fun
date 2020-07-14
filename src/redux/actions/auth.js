import { createAction } from 'redux-actions';
import * as api from '../../API/auth';

export const signUpRequest = createAction('SIGN_UP_REQUEST');
export const signUpSuccess = createAction('SIGN_UP_SUCCESS');
export const signUpFailure = createAction('SIGN_UP_FAILURE');

// регистрация
export const signUp = (newUserData) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    await api.signUpProcess(newUserData);
    dispatch(signUpSuccess());
  } catch (error) {
    dispatch(signUpFailure());
    throw error;
  }
};

export const signInRequest = createAction('LOG_IN_REQUEST');
export const signInSuccess = createAction('LOG_IN_SUCCESS');
export const signInFailure = createAction('LOG_IN_FAILURE');

// авторизация
export const signIn = (userData) => async (dispatch) => {
  dispatch(signInRequest());
  try {
    const responseUserData = await api.signInProcess(userData);
    dispatch(signInSuccess(responseUserData));
  } catch (error) {
    dispatch(signInFailure());
    throw error;
  }
};

export const logOutSuccess = createAction('LOGOUT_SUCCESS');
