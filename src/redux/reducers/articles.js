import { handleActions } from 'redux-actions';
import * as articlesActions from '../actions/articles';

export const articles = handleActions({
  [articlesActions.getArticlesSuccess](state, action) {
    return [...action.payload];
  },
  [articlesActions.refreshLikeInArticlesArray](state, { payload }) {
    const currentArticleIndex = state.findIndex((el) => el.id === payload);
    const currentArticle = state[currentArticleIndex];
    const changedArticle = {
      ...currentArticle,
      favorited: !currentArticle.favorited,
      favoritesCount: (currentArticle.favorited)
        ? currentArticle.favoritesCount - 1
        : currentArticle.favoritesCount + 1,
    };
    return [
      ...state.slice(0, currentArticleIndex),
      changedArticle,
      ...state.slice(currentArticleIndex + 1),
    ];
  },
  [articlesActions.createArticleSuccess]() {
    return [];
  },
  [articlesActions.editArticleSuccess]() {
    return [];
  },
  [articlesActions.removeArticleSuccess]() {
    return [];
  },
}, []);

export const oneArticle = handleActions({
  [articlesActions.getOneArticleSuccess](state, action) {
    return { ...action.payload };
  },
}, {});

export const getArticlesState = handleActions({
  [articlesActions.getArticlesRequest]() {
    return 'requested';
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

export const addLikeState = handleActions({
  [articlesActions.addLikeRequest]() {
    return 'requested';
  },
  [articlesActions.addLikeFailure]() {
    return 'failed';
  },
  [articlesActions.addLikeSuccess]() {
    return 'finished';
  },
}, 'none');

export const removeLikeState = handleActions({
  [articlesActions.removeLikeRequest]() {
    return 'requested';
  },
  [articlesActions.removeLikeFailure]() {
    return 'failed';
  },
  [articlesActions.removeLikeSuccess]() {
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
