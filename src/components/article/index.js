import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useHistory } from 'react-router';
import * as actions from '../../redux/actions/articles';
import { editArticleUrl, mainUrl } from '../../routes';
import disabledLikeSrc from '../../images/like-disabled.svg';
import activeLikeSrc from '../../images/like-active.svg';
import { renderLoader, getDate } from '../../helper';

import {
  ArticlesLikeImg, ArticlesDate, ArticlesDescription,
  ArticlesHeader,
  ArticlesInfo, ArticlesLikesCount,
  ArticlesStats, ArticlesTag, ArticlesTagsWrap,
  ArticlesHeaderTitle, ArticlesUserImage, ArticlesUserInfo, ArticlesUserInfoGroup, ArticlesUsername,
  ArticleAuthorOptions, ArticleDeleteButton, ArticleEditButton, ArticleUserInfoWrap,
  ArticleWrapper, ArticleHeader, ArticleBody,
} from '../../styled-components';

const mapStateToProps = (state) => {
  const {
    articles, userData, oneArticle, oneArticleState, removeArticleState,
  } = state;

  return {
    articles,
    username: userData.username,
    isOneArticleReady: (oneArticleState === 'finished'),
    isArticleRemoved: (removeArticleState === 'finished'),
    oneArticle,
    removeArticleState,
  };
};

const actionCreator = {
  getOneArticle: actions.getOneArticle,
  removeArticle: actions.removeArticle,
};

const Article = (props) => {
  const {
    articles, username, getOneArticle,
    oneArticle, isOneArticleReady, removeArticle, isArticleRemoved,
  } = props;
  const { slug } = useParams();
  const validSlug = slug.slice(1, slug.length);

  const history = useHistory();
  const redirectToHome = () => {
    history.push(mainUrl);
  };

  useEffect(() => {
    // если нету уже загруженного массива постов то получаем один
    if (articles.length === 0) {
      getOneArticle(validSlug);
    }
    if (isArticleRemoved) {
      redirectToHome();
    }
  }, [isArticleRemoved]);

  const handleOnDeleteArticle = () => {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        removeArticle(validSlug);
      },
    });
  };

  const renderArticle = (data) => {
    let article;

    // если пользователь переходит по URL, то грузим нужный article с сервера
    if (!Array.isArray(data)) {
      if (!isOneArticleReady) return renderLoader();
      article = data;
    }

    // если по ссылке со списка артайклов, то берем из массива нужный
    if (Array.isArray(data)) {
      article = data.find((el) => el.slug === validSlug);
    }

    const {
      author, createdAt, description, favoritesCount, favorited, tagList, title, body,
    } = article;
    const isCurrentUserAuthor = (username === author.username);

    const dateDiff = getDate(createdAt);

    const renderTagList = () => (
      tagList.map((tag) => <ArticlesTag key={tag.id}>{tag.title}</ArticlesTag>)
    );

    const renderAuthorOptions = () => {
      if (!isCurrentUserAuthor) return false;
      return (
        <ArticleAuthorOptions>
          <ArticleDeleteButton onClick={handleOnDeleteArticle}>Delete</ArticleDeleteButton>
          <Link to={editArticleUrl(validSlug)}>
            <ArticleEditButton>Edit</ArticleEditButton>
          </Link>
        </ArticleAuthorOptions>
      );
    };

    return (
      <ArticleWrapper>
        <ArticleHeader>
          <ArticlesInfo>
            <ArticlesHeader>
              <ArticlesHeaderTitle>
                {title}
              </ArticlesHeaderTitle>
              <ArticlesStats>
                <ArticlesLikeImg src={favorited ? activeLikeSrc : disabledLikeSrc} />
                <ArticlesLikesCount>{favoritesCount}</ArticlesLikesCount>
              </ArticlesStats>
            </ArticlesHeader>
            <ArticlesTagsWrap>
              {renderTagList()}
            </ArticlesTagsWrap>

            <ArticlesDescription>
              {description}
            </ArticlesDescription>
          </ArticlesInfo>

          <ArticleUserInfoWrap>
            <ArticlesUserInfo>
              <ArticlesUserInfoGroup>
                <ArticlesUsername>{author.username}</ArticlesUsername>
                <ArticlesDate>{dateDiff}</ArticlesDate>
              </ArticlesUserInfoGroup>
              <ArticlesUserImage src={author.image} />
            </ArticlesUserInfo>
            {renderAuthorOptions()}
          </ArticleUserInfoWrap>
        </ArticleHeader>

        <ArticleBody>
          <ReactMarkdown
            source={body}
          />
        </ArticleBody>
      </ArticleWrapper>
    );
  };

  return (articles.length === 0) ? renderArticle(oneArticle) : renderArticle(articles);
};

export default connect(mapStateToProps, actionCreator)(Article);
