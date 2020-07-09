import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as actions from '../../redux/actions/articles';
import { renderLoader } from '../../helper';
import {
  ArticlesWrapper,
  PaginationWrapper,
  ArticlesItemsWrapper,
} from '../../styled-components';
import Article from './article';

const mapStateToProps = (state) => {
  const {
    articles, getArticlesState, createArticleState, editArticleState, removeArticleState,
  } = state;

  const props = {
    articles,
    isArticlesReady: getArticlesState === 'finished',
    isRequestProcessed: getArticlesState === 'processed',
    isNewArticleCreated: createArticleState === 'finished',
    isArticleEdited: editArticleState === 'finished',
    isArticleRemoved: removeArticleState === 'finished',
  };

  return props;
};

const actionCreator = {
  getArticles: actions.getArticles,
  refreshArticles: actions.refreshArticles,
};

const ArticlesList = (props) => {
  const {
    getArticles, articles, isArticlesReady, isRequestProcessed,
    isNewArticleCreated, refreshArticles, isArticleEdited,
    isArticleRemoved,
  } = props;

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setPageSize] = useState(5);

  const getArticlesRequest = async () => {
    await getArticles();
  };

  const renderArticles = (pageNumber, pageSize) => {
    const from = pageNumber * pageSize - pageSize;
    const to = pageNumber * pageSize;
    // показываем по 5 постов
    const currentArticlesArray = Array.from(articles).slice(from, to);

    return <Article articles={currentArticlesArray} />;
  };

  const handleOnChangePagination = (value, pageSize) => {
    setCurrentPageNumber(value);
    setPageSize(pageSize);
  };

  const renderPagination = (total) => (
    <Pagination
      size="small"
      total={total}
      pageSize={5} // по сколько айтемов на странице показываем
      showSizeChanger={false}
      onChange={handleOnChangePagination}
    />
  );

  useEffect(() => {
    // получаем посты пока они есть и убираем дублирование запроса если создан новый пост
    if (!isArticlesReady && !isNewArticleCreated && !isArticleEdited) {
      getArticlesRequest();
    }

    // обновляем посты после создания поста / редактирования / удаления
    if (isNewArticleCreated || isArticleEdited || isArticleRemoved) refreshArticles();
  }, [isArticlesReady, isNewArticleCreated, isArticleEdited]);

  return (
    <ArticlesWrapper>
      <ArticlesItemsWrapper>
        {(isRequestProcessed || isArticlesReady)
          ? renderArticles(currentPageNumber, currentPageSize)
          : renderLoader()}
      </ArticlesItemsWrapper>

      <PaginationWrapper>
        {renderPagination(articles.length)}
      </PaginationWrapper>
    </ArticlesWrapper>
  );
};

ArticlesList.propTypes = {
  getArticles: propTypes.func,
  articles: propTypes.arrayOf(propTypes.object),
  isArticlesReady: propTypes.bool,
  isRequestProcessed: propTypes.bool,
  isNewArticleCreated: propTypes.bool,
  refreshArticles: propTypes.func,
  isArticleEdited: propTypes.bool,
  isArticleRemoved: propTypes.bool,
};

ArticlesList.defaultProps = {
  getArticles: null,
  articles: [],
  isArticlesReady: false,
  isRequestProcessed: false,
  isNewArticleCreated: false,
  refreshArticles: null,
  isArticleEdited: false,
  isArticleRemoved: false,
};

export default connect(mapStateToProps, actionCreator)(ArticlesList);
