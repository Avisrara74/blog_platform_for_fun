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
    isRequestProcessed: getArticlesState === 'requested',
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

  const [currentPage, setCurrentPage] = useState(1);
  const getArticlesRequest = async () => {
    await getArticles(5, currentPage * 5 - 5);
  };

  const renderArticles = () => {
    if (isRequestProcessed) return renderLoader();
    return <Article articles={articles} />;
  };

  const handleOnChangePagination = (value, pageSize) => {
    setCurrentPage(value);
    getArticles(pageSize, value * pageSize - pageSize);
  };

  const renderPagination = () => {
    if (isRequestProcessed) return null;
    return (
      <Pagination
        size="small"
        total={500}
        current={currentPage}
        pageSize={5} // по сколько айтемов на странице показываем
        showSizeChanger={false}
        onChange={handleOnChangePagination}
      />
    );
  };

  useEffect(() => {
    if (!isArticlesReady && !isNewArticleCreated && !isArticleEdited) {
      getArticlesRequest();
    }

    // обновляем посты после создания поста / редактирования / удаления
    if (isNewArticleCreated || isArticleEdited || isArticleRemoved) refreshArticles();
  }, [isArticlesReady, isNewArticleCreated, isArticleEdited, articles]);

  return (
    <ArticlesWrapper>
      <ArticlesItemsWrapper>
        {renderArticles()}
      </ArticlesItemsWrapper>

      <PaginationWrapper>
        {renderPagination()}
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
