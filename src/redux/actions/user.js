import { createAction } from 'redux-actions';
import * as api from '../../API/user';

// изменить профиль пользователя
export const editUserProfileRequest = createAction('EDIT_USER_PROFILE_REQUEST');
export const editUserProfileSuccess = createAction('EDIT_USER_PROFILE_SUCCESS');
export const editUserProfileFailure = createAction('EDIT_USER_PROFILE_FAILURE');

export const editUserProfile = (userData, formik) => async (dispatch) => {
  dispatch(editUserProfileRequest());
  try {
    const response = await api.editUserProfile(userData, formik);
    dispatch(editUserProfileSuccess(response));
  } catch (error) {
    dispatch(editUserProfileFailure());
    throw error;
  }
};
