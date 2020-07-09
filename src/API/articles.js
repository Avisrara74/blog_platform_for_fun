import axios from 'axios';
import { uniqueId } from 'lodash';
import * as routes from './routes';
import { checkFieldErrors, networkErrorCheck, mainRequestHandler } from './index';

axios.interceptors.request.use(
  (req) => mainRequestHandler(req),
);

// получаем список статей частями (подробнее см. redux/actions/articles getArticles)
export const getArticles = async (articlesPerRequest, articlesCounter) => {
  // counter увеличивается на кол-во полученных статей после каждого вызова функции из экшена
  const localRequestHandler = (req) => {
    req.params = { limit: articlesPerRequest, offset: articlesCounter };
    return req;
  };

  // инициализируем чтобы удалить после запроса
  const requestInterceptor = axios.interceptors.request.use(
    (req) => localRequestHandler(req),
  );

  try {
    const response = await axios.get(routes.articlesUrl);

    const { articles, articlesCount } = response.data;

    const initialArticlesById = articles.map((el) => ({
      ...el,
      id: uniqueId(),
      tagList: el.tagList.map((tagName) => ({ id: uniqueId(), title: tagName })),
    }));
    const articlesArray = [...initialArticlesById];

    // удаляем интерцептор
    axios.interceptors.request.eject(requestInterceptor);

    return {
      articles: articlesArray,
      articlesCount,
    };
  } catch (error) {
    networkErrorCheck(error);
    throw error;
  }
};

// создание поста
export const createArticle = async (articleBody, formik) => {
  try {
    const response = await axios.post(routes.articlesUrl, articleBody);

    const { article } = response.data;

    return {
      ...article,
      id: uniqueId(),
      tagList: article.tagList.map((tagName) => ({ id: uniqueId(), title: tagName })),
    };
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      checkFieldErrors(error.response.data.errors, formik);
    }
    throw error;
  }
};

// запрос 1 поста
// eslint-disable-next-line consistent-return
export const getOneArticle = async (queryParam) => {
  try {
    const url = routes.oneArticleUrl(queryParam);
    const response = await axios.get(url);

    const { article } = response.data;

    return {
      ...article,
      id: uniqueId(),
      tagList: article.tagList.map((tagName) => ({ id: uniqueId(), title: tagName })),
    };
  } catch (error) {
    networkErrorCheck(error);
  }
};

// изменить пост
export const editArticle = async (articleBody, queryParam, formik) => {
  try {
    const url = routes.oneArticleUrl(queryParam);
    await axios.put(url, articleBody);
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      checkFieldErrors(error.response.data.errors, formik);
    }
  }
};

// лайкнуть пост
// eslint-disable-next-line consistent-return
export const addLike = async (likeBody) => {
  const { id, slug, favorited } = likeBody;
  try {
    // лайк или дизлайк в зависимости от текущего состояния
    const response = (favorited === true)
      ? await axios.delete(routes.changeLikeUrl(slug))
      : await axios.post(routes.changeLikeUrl(slug));

    return {
      isFavorited: response.data.article.favorited,
      id,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.response);
  }
};

// удалить пост
export const removeArticle = async (queryParam) => {
  const url = routes.oneArticleUrl(queryParam);
  await axios.delete(url);
};
