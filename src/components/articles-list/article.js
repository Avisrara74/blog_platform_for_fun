import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getDate } from '../../helper';
import * as actions from '../../redux/actions/articles';
import {
  ArticlesLikeImg, ArticlesDate, ArticlesDescription,
  ArticlesHeader,
  ArticlesInfo, ArticlesItem, ArticlesLikesCount,
  ArticlesStats,
  ArticlesTag, ArticlesTagsWrap,
  ArticlesHeaderTitle, ArticlesUserImage,
  ArticlesUserInfoWrap, ArticlesUserInfoGroup, ArticlesUsername,
} from '../../styled-components';
import { articleUrl, signInUrl } from '../../routes';
import activeLikeSrc from '../../images/like-active.svg';
import disabledLikeSrc from '../../images/like-disabled.svg';

const linkStyles = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.75)',
};
const mapStateToProps = (state) => {
  const { isAuthorized } = state.userData;

  return {
    isAuthorized,
  };
};

const actionCreator = {
  addLike: actions.addLike,
  removeLike: actions.removeLike,
  refreshLikesUI: actions.refreshLikesUI,
};

const Article = (props) => {
  const {
    articles, refreshLikesUI,
    addLike, removeLike,
    isAuthorized,
  } = props;

  const [timerIdChangeLike, setTimerIdChangeLike] = useState(0);
  const history = useHistory();
  const redirectToSignIn = () => {
    history.push(signInUrl);
  };

  const changeLikeRequest = (articleLikeInfo) => {
    const { favorited, slug } = articleLikeInfo;
    if (!favorited) {
      return addLike(slug);
    }
    return removeLike(slug);
  };

  const handleOnLikeArticle = async (event, articleLikeInfo) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthorized) {
      redirectToSignIn();
      return false;
    }
    setTimerIdChangeLike(clearTimeout(timerIdChangeLike));
    await refreshLikesUI(articleLikeInfo.id);

    // пользователь может припадочно жать на кнопку лайка
    // поэтому отправляем лайк на сервер только через полсекунды
    return setTimerIdChangeLike(setTimeout(() => changeLikeRequest(articleLikeInfo), 500));
  };

  const renderArticle = () => articles.map((article) => {
    const {
      author, createdAt, description, id, tagList, title, slug, favorited, favoritesCount,
    } = article;
    const { username, image } = author;
    const dateDiff = getDate(createdAt);

    const renderTagList = () => (
      tagList.map((tag) => <ArticlesTag key={tag.id}>{tag.title}</ArticlesTag>)
    );

    const isLiked = favorited ? activeLikeSrc : disabledLikeSrc;

    const articleLikeInfo = {
      id,
      favorited,
      slug,
    };

    return (
      <Link to={articleUrl(slug)} style={linkStyles} key={id}>
        <ArticlesItem>
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

          <ArticlesUserInfoWrap>
            <ArticlesUserInfoGroup>
              <ArticlesUsername>{username}</ArticlesUsername>
              <ArticlesDate>{dateDiff}</ArticlesDate>
            </ArticlesUserInfoGroup>
            <ArticlesUserImage src={image} />
          </ArticlesUserInfoWrap>
        </ArticlesItem>
      </Link>
    );
  });

  return renderArticle();
};

export default connect(mapStateToProps, actionCreator)(Article);
