import { combineReducers } from 'redux';
import * as data from './dataReducers';
import * as state from './stateReducers';

export default combineReducers({
  signUpState: state.signUpState,
  signInState: state.signInState,
  getArticlesState: state.getArticlesState,
  createArticleState: state.createArticleState,
  editUserProfileState: state.editUserProfileState,
  oneArticleState: state.oneArticleState,
  editArticleState: state.editArticleState,
  addLikeRequestState: state.addLikeRequestState,
  localLikesStateProcess: state.localLikesStateProcess,
  removeArticleState: state.removeArticleState,

  likesStateOnServer: data.likesStateOnServer,
  userData: data.userData,
  articles: data.articles,
  oneArticle: data.oneArticle,
});
