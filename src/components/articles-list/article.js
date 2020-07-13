import React from 'react';
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
  const { likesStateOnServer, addLikeRequestState, localLikesStateProcess } = state;

  const { isAuthorized } = state.userData;
  const isLikeChangedOnServer = localLikesStateProcess === 'finished';

  return {
    likesStateOnServer, isLikeChangedOnServer, addLikeRequestState, isAuthorized,
  };
};

const actionCreator = {
  addLike: actions.addLike,
};

const Article = (props) => {
  const {
    articles,
    addLike, addLikeRequestState,
    isAuthorized,
  } = props;

  const history = useHistory();
  const redirectToSignIn = () => {
    history.push(signInUrl);
  };

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

    console.log(isDiff);
    console.log(likeBody);
    if (isDiff) {
      console.log('повторный запрос');
      addLike(likeBody);
    }
  };

  useEffect(() => {
    if (isLikeChangedOnServer) {
      console.log('повторный запрос');
      repeatChangeLikeRequest();
    }
  }, [likesStateOnServer]); */

  const handleOnLikeArticle = (event, articleLikeInfo) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthorized) {
      redirectToSignIn();
      return false;
    }

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
