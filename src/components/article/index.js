import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useHistory } from 'react-router';
import * as actions from '../../redux/actions/articles';
import { editArticleUrl, mainUrl, signInUrl } from '../../routes';
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
    oneArticleState,
    isAuthorized: userData.isAuthorized,
  };
};

const actionCreator = {
  getOneArticle: actions.getOneArticle,
  removeArticle: actions.removeArticle,
  addLike: actions.addLike,
  removeLike: actions.removeLike,
  refreshCurrentArticleLikeUI: actions.refreshCurrentArticleLikeUI,
  refreshLikesUI: actions.refreshLikesUI,
};

const Article = (props) => {
  const {
    username, getOneArticle,
    oneArticle, isOneArticleReady, removeArticle, isArticleRemoved,
    addLike, removeLike, isAuthorized, refreshCurrentArticleLikeUI, refreshLikesUI,
  } = props;
  const [timerIdChangeLike, setTimerIdChangeLike] = useState(0);
  const { slug } = useParams();
  const validSlug = slug.slice(1, slug.length);

  const history = useHistory();
  const redirectToHome = () => {
    history.push(mainUrl);
  };
  const redirectToSignIn = () => {
    history.push(signInUrl);
  };

  // 2 step
  const changeLikeRequest = (articleLikeInfo) => {
    const { favorited } = articleLikeInfo;
    if (!favorited) {
      return addLike(validSlug);
    }
    return removeLike(validSlug);
  };

  // 1 step
  const handleOnLikeArticle = async (event, articleLikeInfo) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthorized) {
      redirectToSignIn();
      return false;
    }
    setTimerIdChangeLike(clearTimeout(timerIdChangeLike));
    await refreshCurrentArticleLikeUI(); // UI обновить лайк текущего поста
    await refreshLikesUI(validSlug); // UI обновить лайк в массиве постов(главная стр.)

    // пользователь может припадочно жать на кнопку лайка
    // поэтому отправляем лайк на сервер только через полсекунды
    return setTimerIdChangeLike(setTimeout(() => changeLikeRequest(articleLikeInfo), 500));
  };

  useEffect(() => {
    // грузим пост
    if (Object.values(oneArticle).length === 0 || oneArticle.slug !== validSlug) {
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

  const renderAuthorOptions = (isCurrentUserAuthor) => {
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

  const renderArticle = (article) => {
    if (!isOneArticleReady) return renderLoader();

    const {
      id, author, createdAt, description, favoritesCount, favorited, tagList, title, body,
    } = article;
    const isCurrentUserAuthor = (username === author.username);

    const dateDiff = getDate(createdAt);

    const renderTagList = () => (
      tagList.map((tag) => <ArticlesTag key={tag.id}>{tag.title}</ArticlesTag>)
    );

    const isLiked = favorited ? activeLikeSrc : disabledLikeSrc;

    const articleLikeInfo = {
      id,
      favorited,
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
                <ArticlesLikeImg
                  onClick={(event) => handleOnLikeArticle(event, articleLikeInfo)}
                  src={isLiked}
                />
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
            {renderAuthorOptions(isCurrentUserAuthor)}
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

  return renderArticle(oneArticle);
};

export default connect(mapStateToProps, actionCreator)(Article);
