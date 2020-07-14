import { handleActions } from 'redux-actions';
import * as userActions from '../actions/user';

// eslint-disable-next-line import/prefer-default-export
export const editUserProfileState = handleActions({
  [userActions.editUserProfileRequest]() {
    return 'requested';
  },
  [userActions.editUserProfileFailure]() {
    return 'failed';
  },
  [userActions.editUserProfileSuccess]() {
    return 'finished';
  },
}, 'none');
