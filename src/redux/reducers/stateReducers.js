import { handleActions } from 'redux-actions';
import * as userActions from '../actions/user';
import * as articlesActions from '../actions/articles';
import * as authActions from '../actions/auth';

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

export const getArticlesState = handleActions({
  [articlesActions.getArticlesProcess]() {
    return 'processed';
  },
  [articlesActions.refreshArticlesRequest]() {
    return 'requested';
  },
  [articlesActions.getArticlesSuccess]() {
    return 'finished';
  },
}, 'none');

export const createArticleState = handleActions({
  [articlesActions.createArticleRequest]() {
    return 'requested';
  },
  [articlesActions.createArticleFailure]() {
    return 'failed';
  },
  [articlesActions.createArticleSuccess]() {
    return 'finished';
  },
}, 'none');

export const oneArticleState = handleActions({
  [articlesActions.getOneArticleRequest]() {
    return 'requested';
  },
  [articlesActions.getOneArticleFailure]() {
    return 'failed';
  },
  [articlesActions.getOneArticleSuccess]() {
    return 'finished';
  },
}, 'none');

export const editArticleState = handleActions({
  [articlesActions.editArticleRequest]() {
    return 'requested';
  },
  [articlesActions.editArticleFailure]() {
    return 'failed';
  },
  [articlesActions.editArticleSuccess]() {
    return 'finished';
  },
}, 'none');

export const addLikeRequestState = handleActions({
  [articlesActions.addLikeRequest](state, action) {
    // id лайков запрос на изменение которых уже отправлен
    return [...state, action.payload];
  },
  [articlesActions.addLikeFailure]() {
    return 'failed';
  },
  [articlesActions.addLikeSuccess](state, action) {
    // удаляем id лайка после завершения реквеста
    return [...state.filter((el) => el !== action.payload.id)];
  },
}, []);

export const localLikesStateProcess = handleActions({
  [articlesActions.addLikeSuccess]() {
    return 'finished';
  },
}, 'none');

export const removeArticleState = handleActions({
  [articlesActions.removeArticleRequest]() {
    return 'requested';
  },
  [articlesActions.removeArticleFailure]() {
    return 'failed';
  },
  [articlesActions.removeArticleSuccess]() {
    return 'finished';
  },
}, 'none');
