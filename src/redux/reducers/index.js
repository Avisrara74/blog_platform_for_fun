import { combineReducers } from 'redux';
import * as articles from './articles';
import * as auth from './auth';
import * as editUser from './editUser';

export default combineReducers({
  signUpState: auth.signUpState,
  signInState: auth.signInState,
  editUserProfileState: editUser.editUserProfileState,
  getArticlesState: articles.getArticlesState,
  createArticleState: articles.createArticleState,
  oneArticleState: articles.oneArticleState,
  editArticleState: articles.editArticleState,
  addLikeState: articles.addLikeState,
  removeLikeState: articles.removeLikeState,
  removeArticleState: articles.removeArticleState,

  userData: auth.userData,
  articles: articles.articles,
  oneArticle: articles.oneArticle,
});
