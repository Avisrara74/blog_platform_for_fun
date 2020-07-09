import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { articleUrl } from '../../routes';
import activeLikeSrc from '../../images/like-active.svg';
import disabledLikeSrc from '../../images/like-disabled.svg';

const linkStyles = {
  textDecoration: 'none',
  color: 'rgba(0, 0, 0, 0.75)',
};
const mapStateToProps = (state) => {
  const { likesStateOnServer, addLikeRequestState, localLikesStateProcess } = state;

  const isLikeChangedOnServer = localLikesStateProcess === 'finished';

  return { likesStateOnServer, isLikeChangedOnServer, addLikeRequestState };
};

const actionCreator = {
  addLike: actions.addLike,
};

const Article = (props) => {
  const {
    articles,
    addLike, addLikeRequestState,
  } = props;

  /* const repeatChangeLikeRequest = () => {
    const newLikesState = likesStateOnServer.map((serverLikeState) => {
      const findEl = articles.find((article) => article.id === serverLikeState.id);

      // объединить фейковые лайки и те которые пришли от сервера в один объект
      // для удобного сравнения
      if (findEl) {
        return {
          id: findEl.id,
          slug: findEl.slug,
          favorited: findEl.favorited,
          isLikedOnServer: serverLikeState.isFavorited,
          isRepeatedRequest: true,
        };
      }
      return serverLikeState;
    });

    const isDiff = newLikesState.some((el) => el.favorited !== el.isLikedOnServer);
    const likeBody = newLikesState.find((el) => el.favorited !== el.isLikedOnServer);

    console.log(newLikesState);
    console.log(isDiff);
    console.log(likeBody);
    console.log(articles);
    console.log(likesStateOnServer);
    if (isDiff === true) {
      console.log('повторный запрос');
      addLike(likeBody);
    }
  }; */

  /* useEffect(() => {
    if (isLikeChangedOnServer) repeatChangeLikeRequest();
  }, [likesStateOnServer]); */

  const handleOnLikeArticle = (event, articleLikeInfo) => {
    event.preventDefault();
    event.stopPropagation();

    const isCurrentLikeRequested = addLikeRequestState.some((el) => el === articleLikeInfo.id);
    if (isCurrentLikeRequested) {
      const rejectRequest = { ...articleLikeInfo, isAlreadyRequested: true };
      // eslint-disable-next-line no-console
      console.log('отправка запрещена');
      return addLike(rejectRequest);
    }

    return addLike(articleLikeInfo);
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
      isAlreadyRequested: false,
      isRepeatedRequest: false,
    };

    /*
    1) пользователь нажимает на фейк-лайк
    2) отправляется запрос на сервер с измененным фейк-состоянием
       если пользователь нажимает на лайк пока запрос идет, то повторный запрос не отправляется
    3) приходит ответ с изменённым состоянием
       после ответа проверяем, состояние фейк-лайка такое же как и у обновлённого состояния?
       если да, то оставляем всё как есть
       если нет, то снова отправляем запрос на сервер
      */

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
