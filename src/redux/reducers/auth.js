import { handleActions } from 'redux-actions';
import * as authActions from '../actions/auth';
import { removeItemFromLocalstorage, setItemToLocalstorage } from '../../localstorage';
import * as userActions from '../actions/user';

export const signUpState = handleActions({
  [authActions.signUpRequest]() {
    return 'requested';
  },
  [authActions.signUpFailure]() {
    return 'failed';
  },
  [authActions.signUpSuccess]() {
    return 'finished';
  },
}, 'none');

export const signInState = handleActions({
  [authActions.signInRequest]() {
    return 'requested';
  },
  [authActions.signInFailure]() {
    return 'failed';
  },
  [authActions.signInSuccess]() {
    return 'finished';
  },
}, 'none');

const userDataInitial = () => {
  if (localStorage.token === undefined) {
    return {
      username: '', token: '', isAuthorized: false, userProfileImage: undefined, email: '',
    };
  }
  return {
    isAuthorized: true,
    token: localStorage.token,
    username: localStorage.username,
    userProfileImage: localStorage.userProfileImage,
    email: localStorage.email,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const userData = handleActions({
  [authActions.signInSuccess](state, action) {
    const {
      username, token, isAuthorized, userProfileImage, email,
    } = action.payload;
    setItemToLocalstorage('token', token);
    setItemToLocalstorage('username', username);
    setItemToLocalstorage('userProfileImage', userProfileImage);
    setItemToLocalstorage('email', email);
    return {
      username, token, isAuthorized, userProfileImage, email,
    };
  },
  [userActions.editUserProfileSuccess](state, action) {
    const { username, userProfileImage, email } = action.payload;
    removeItemFromLocalstorage('username');
    setItemToLocalstorage('username', username);
    removeItemFromLocalstorage('userProfileImage');
    setItemToLocalstorage('userProfileImage', userProfileImage);
    removeItemFromLocalstorage('email');
    setItemToLocalstorage('email', email);
    return {
      ...state, username, userProfileImage, email,
    };
  },
  [authActions.logOutSuccess]() {
    removeItemFromLocalstorage('token');
    removeItemFromLocalstorage('username');
    removeItemFromLocalstorage('userProfileImage');
    removeItemFromLocalstorage('email');
    return userDataInitial();
  },
}, userDataInitial());
