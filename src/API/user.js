import axios from 'axios';
import * as routes from './routes';
import { mainRequestHandler, networkErrorCheck } from './index';

axios.interceptors.request.use(
  (req) => mainRequestHandler(req),
);

// редактирование профиля пользователя
// eslint-disable-next-line import/prefer-default-export,consistent-return
export const editUserProfile = async (userData) => {
  try {
    const response = await axios.put(routes.userProfileUrl, userData);

    const { user } = response.data;
    return {
      username: user.username,
      userProfileImage: user.image,
      email: user.email,
    };
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      throw error;
    }
  }
};
