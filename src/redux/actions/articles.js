import { createAction } from 'redux-actions';
import * as api from '../../API/articles';

export const getArticlesProcess = createAction('GET_ARTICLES_PROCESS');
export const getArticlesSuccess = createAction('GET_ARTICLES_SUCCESS');
// при запросе на сервер статьи возвращаются пачками размером articlesPerRequest
// в ответе приходит { articles: [], articlesCount: value }
// массив articles диспатчим, чтобы не ждать от сервера все статьи(вдруг их тысячи)
// Каждую итерацию сравниваем уже полученное число статей и кол-во на сервере
// если на сервере статьи еще есть, то на фоне делаем запросы для их получения
export const getArticles = () => async (dispatch) => {
  let currentArticlesCounter = 0;

  const fetchArticles = async (articlesPerRequest = 100, counter = 0) => {
    const response = await api.getArticles(articlesPerRequest, counter);
    const { articles, articlesCount } = response;
    dispatch(getArticlesProcess(articles));

    currentArticlesCounter += articles.length;
    if (currentArticlesCounter < articlesCount) {
      await fetchArticles(articlesPerRequest, currentArticlesCounter);
    }
    if (currentArticlesCounter === articlesCount) {
      dispatch(getArticlesSuccess());
    }
  };
  await fetchArticles();
};

// создать пост
export const createArticleRequest = createAction('CREATE_ARTICLE_REQUEST');
export const createArticleSuccess = createAction('CREATE_ARTICLE_SUCCESS');
export const createArticleFailure = createAction('CREATE_ARTICLE_FAILURE');

export const createArticle = (articleBody, formik) => async (dispatch) => {
  dispatch(createArticleRequest());
  try {
    await api.createArticle(articleBody, formik);
    dispatch(createArticleSuccess());
  } catch (error) {
    dispatch(createArticleFailure());
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

export const editArticle = (articleData, queryParam, formik) => async (dispatch) => {
  dispatch(editArticleRequest());
  try {
    await api.editArticle(articleData, queryParam, formik);
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

export const refreshLikeInArticlesArray = createAction('REFRESH_LIKE_IN_ARTICLES_ARRAY');

export const addLike = (likeBody) => async (dispatch) => {
  if (!likeBody.isRepeatedRequest) {
    dispatch(refreshLikeInArticlesArray(likeBody.id));
  }

  // запрещаем отправку на сервер если лайк уже отправлен
  if (likeBody.isAlreadyRequested) return;
  dispatch(addLikeRequest(likeBody.id));
  try {
    const response = await api.addLike(likeBody);
    dispatch(addLikeSuccess(response));
  } catch (error) {
    dispatch(addLikeFailure());
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
