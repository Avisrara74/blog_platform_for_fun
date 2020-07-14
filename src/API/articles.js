import axios from 'axios';
import { uniqueId } from 'lodash';
import * as routes from './routes';
import { networkErrorCheck, mainRequestHandler } from './index';

axios.interceptors.request.use(
  (req) => mainRequestHandler(req),
);

export const getArticles = async (articlesPerRequest, offset) => {
  try {
    const response = await axios({
      url: routes.articlesUrl,
      params: { limit: articlesPerRequest, offset },
      method: 'GET',
    });

    const { articles } = response.data;

    const initialArticlesById = articles.map((el) => ({
      ...el,
      id: uniqueId(),
      tagList: el.tagList.map((tagName) => ({ id: uniqueId(), title: tagName })),
    }));

    return {
      articles: initialArticlesById,
    };
  } catch (error) {
    networkErrorCheck(error);
    throw error;
  }
};

// создание поста
// eslint-disable-next-line consistent-return
export const createArticle = async (articleBody) => {
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
      throw error;
    }
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
export const editArticle = async (articleBody, queryParam) => {
  try {
    const url = routes.oneArticleUrl(queryParam);
    await axios.put(url, articleBody);
  } catch (error) {
    networkErrorCheck(error);
    if (error.response.status === 422) {
      throw error;
    }
  }
};

// лайкнуть пост
// eslint-disable-next-line consistent-return
export const addLike = async (slug) => {
  try {
    await axios.post(routes.changeLikeUrl(slug));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.response);
  }
};

export const removeLike = async (slug) => {
  try {
    await axios.delete(routes.changeLikeUrl(slug));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.response);
    throw error;
  }
};

// удалить пост
export const removeArticle = async (queryParam) => {
  const url = routes.oneArticleUrl(queryParam);
  await axios.delete(url);
};
