import axios from 'axios';
import * as routes from './routes';
import {
  checkFieldErrors,
  mainRequestHandler,
  networkErrorCheck,
  signInErrorsCheck,
} from './index';

axios.interceptors.request.use(
  (req) => mainRequestHandler(req),
);

// авторизация
export const signInProcess = async (userData, formik) => {
  try {
    const response = await axios.post(routes.signInUrl, userData);
    const responseUserData = response.data.user;
    return {
      username: responseUserData.username,
      token: responseUserData.token,
      isAuthorized: true,
      userProfileImage: responseUserData.image,
    };
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      signInErrorsCheck(error.response.data.errors, formik);
    }
    throw error;
  }
};

// регистрация
export const signUpProcess = async (newUser, formik) => {
  try {
    await axios.post(routes.signUpUrl, newUser);
    alert('Регистрация прошла успешно'); // eslint-disable-line no-alert
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      checkFieldErrors(error.response.data.errors, formik);
    }
    throw error;
  }
};
