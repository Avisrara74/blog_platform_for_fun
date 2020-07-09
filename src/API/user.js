import axios from 'axios';
import * as routes from './routes';
import { checkFieldErrors, mainRequestHandler, networkErrorCheck } from './index';

axios.interceptors.request.use(
  (req) => mainRequestHandler(req),
);

// редактирование профиля пользователя
// eslint-disable-next-line import/prefer-default-export
export const editUserProfile = async (userData, formik) => {
  try {
    const response = await axios.put(routes.userProfileUrl, userData);

    const { user } = response.data;
    return {
      username: user.username,
      userProfileImage: user.image,
    };
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      checkFieldErrors(error.response.data.errors, formik);
    }
    throw error;
  }
};
