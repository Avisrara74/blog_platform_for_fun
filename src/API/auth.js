import axios from 'axios';
import * as routes from './routes';
import {
  mainRequestHandler,
  networkErrorCheck,
} from './index';

axios.interceptors.request.use(
  (req) => mainRequestHandler(req),
);

// авторизация
// eslint-disable-next-line consistent-return
export const signInProcess = async (userData) => {
  try {
    const response = await axios.post(routes.signInUrl, userData);
    const responseUserData = response.data.user;
    return {
      username: responseUserData.username,
      token: responseUserData.token,
      isAuthorized: true,
      userProfileImage: responseUserData.image,
      email: responseUserData.email,
    };
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      throw error;
    }
  }
};

// регистрация
export const signUpProcess = async (newUser) => {
  try {
    await axios.post(routes.signUpUrl, newUser);
    alert('Регистрация прошла успешно'); // eslint-disable-line no-alert
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      throw error;
    }
  }
};
