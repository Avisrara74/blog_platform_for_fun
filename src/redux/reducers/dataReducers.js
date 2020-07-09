import { handleActions } from 'redux-actions';
import * as userActions from '../actions/user';
import * as articlesActions from '../actions/articles';
import * as authActions from '../actions/auth';

import { removeItemFromLocalstorage, setItemToLocalstorage } from '../../localstorage';

const userDataInitial = {
  username: '', token: '', isAuthorized: false, userProfileImage: undefined,
};
export const userData = handleActions({
  [authActions.signInSuccess](state, action) {
    const {
      username, token, isAuthorized, userProfileImage,
    } = action.payload;
    setItemToLocalstorage('token', token);
    setItemToLocalstorage('username', username);
    setItemToLocalstorage('userProfileImage', userProfileImage);
    return {
      username, token, isAuthorized, userProfileImage,
    };
  },
  [userActions.editUserProfileSuccess](state, action) {
    const { username, userProfileImage } = action.payload;
    removeItemFromLocalstorage('username');
    setItemToLocalstorage('username', username);
    removeItemFromLocalstorage('userProfileImage');
    setItemToLocalstorage('userProfileImage', userProfileImage);
    return { username, userProfileImage };
  },
  [authActions.logOutSuccess]() {
    removeItemFromLocalstorage('token');
    removeItemFromLocalstorage('username');
    return userDataInitial;
  },
}, userDataInitial);

export const articles = handleActions({
  [articlesActions.getArticlesProcess](state, action) {
    return [...state, ...action.payload];
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

export const likesStateOnServer = handleActions({
  [articlesActions.addLikeSuccess](state, action) {
    const elAlreadyHave = state.some((el) => el.id === action.payload.id);
    if (elAlreadyHave) {
      const newState = state.map((el) => (
        (el.id === action.payload.id) ? { ...el, isFavorited: action.payload.isFavorited } : el
      ));
      return [...newState];
    }
    return [...state, { ...action.payload }];
  },
}, []);
