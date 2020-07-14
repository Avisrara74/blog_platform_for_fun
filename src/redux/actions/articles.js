import { createAction } from 'redux-actions';
import * as api from '../../API/articles';

// получить посты в зависимости от страницы в пагинации
export const getArticlesRequest = createAction('GET_ARTICLES_REQUEST');
export const getArticlesSuccess = createAction('GET_ARTICLES_SUCCESS');
export const getArticles = (articlesPerRequest = 5, offset = 0) => async (dispatch) => {
  dispatch(getArticlesRequest());
  const response = await api.getArticles(articlesPerRequest, offset);
  const { articles } = response;
  dispatch(getArticlesSuccess(articles));
};

// создать пост
export const createArticleRequest = createAction('CREATE_ARTICLE_REQUEST');
export const createArticleSuccess = createAction('CREATE_ARTICLE_SUCCESS');
export const createArticleFailure = createAction('CREATE_ARTICLE_FAILURE');

export const createArticle = (articleBody) => async (dispatch) => {
  dispatch(createArticleRequest());
  try {
    await api.createArticle(articleBody);
    dispatch(createArticleSuccess());
  } catch (error) {
    dispatch(createArticleFailure());
    throw error;
  }
};

// запросить 1 пост
// этот экшен нужен, чтобы загрузить пост просматриваемый пользователем
// если он вбивает ссылку на пост в адресной строке
export const getOneArticleRequest = createAction('GET_ONE_ARTICLE_REQUEST');
export const getOneArticleSuccess = createAction('GET_ONE_ARTICLE_SUCCESS');
export const getOneArticleFailure = createAction('GET_ONE_ARTICLE_FAILURE');

export const getOneArticle = (queryParam) => async (dispatch) => {
  dispatch(getOneArticleRequest());
  try {
    const response = await api.getOneArticle(queryParam);
    dispatch(getOneArticleSuccess(response));
  } catch (error) {
    dispatch(getOneArticleFailure());
    throw error;
  }
};

// изменить пост
export const editArticleRequest = createAction('EDIT_ARTICLE_REQUEST');
export const editArticleSuccess = createAction('EDIT_ARTICLE_SUCCESS');
export const editArticleFailure = createAction('EDIT_ARTICLE_FAILURE');

export const editArticle = (articleData, queryParam) => async (dispatch) => {
  dispatch(editArticleRequest());
  try {
    await api.editArticle(articleData, queryParam);
    dispatch(editArticleSuccess());
  } catch (error) {
    dispatch(editArticleFailure);
    throw error;
  }
};

// лайк поста
export const addLikeRequest = createAction('ADD_LIKE_REQUEST');
export const addLikeSuccess = createAction('ADD_LIKE_SUCCESS');
export const addLikeFailure = createAction('ADD_LIKE_FAILURE');
export const addLike = (slug) => async (dispatch) => {
  dispatch(addLikeRequest());
  try {
    await api.addLike(slug);
    dispatch(addLikeSuccess());
  } catch (error) {
    dispatch(addLikeFailure());
    throw error;
  }
};

export const refreshLikeInArticlesArray = createAction('REFRESH_LIKE_IN_ARTICLES_ARRAY');
export const refreshLikesUI = (id) => async (dispatch) => {
  dispatch(refreshLikeInArticlesArray(id));
};

export const removeLikeRequest = createAction('REMOVE_LIKE_REQUEST');
export const removeLikeSuccess = createAction('REMOVE_LIKE_SUCCESS');
export const removeLikeFailure = createAction('REMOVE_LIKE_FAILURE');
export const removeLike = (slug) => async (dispatch) => {
  dispatch(removeLikeRequest());
  try {
    await api.removeLike(slug);
    dispatch(removeLikeSuccess());
  } catch (error) {
    dispatch(removeLikeFailure());
    throw error;
  }
};

// удалить пост
export const removeArticleRequest = createAction('REMOVE_ARTICLE_REQUEST');
export const removeArticleSuccess = createAction('REMOVE_ARTICLE_SUCCESS');
export const removeArticleFailure = createAction('REMOVE_ARTICLE_FAILURE');

export const removeArticle = (queryParam) => async (dispatch) => {
  dispatch(removeArticleRequest());
  try {
    await api.removeArticle(queryParam);
    dispatch(removeArticleSuccess());
  } catch (error) {
    dispatch(removeArticleFailure());
    throw error;
  }
};

// обновить посты после создания нового поста / удаления / редактирования
export const refreshArticlesRequest = createAction('REFRESH_ARTICLES_REQUEST');

// обновить список постов
export const refreshArticles = () => async (dispatch) => {
  dispatch(createArticleFailure());
  dispatch(refreshArticlesRequest());
  dispatch(editArticleFailure());
  dispatch(getOneArticleFailure());
  dispatch(removeArticleFailure());
};
