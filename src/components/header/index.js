import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  signInUrl, signUpUrl, mainUrl, createArticleUrl, editProfileUrl,
} from '../../routes';
import {
  ArticlesUserImage, HeaderWrapper, HeaderIsAuth, HeaderUsername, HeaderIsNotAuth,
  HeaderSignIn, HeaderSignUp, HeaderCreateArticle, HeaderLogOut,
  HeaderEditProfile,
} from '../../styled-components';
import userDefaultImgUrl from '../../images/user-default-img.svg';
import { logOutSuccess as logOutProcess } from '../../redux/actions/auth';

const mapStateToProps = (state) => {
  const { isAuthorized, username, userProfileImage } = state.userData;
  const userImageUrl = () => {
    if (typeof userProfileImage === 'string' && userProfileImage) {
      return userProfileImage;
    }
    return userDefaultImgUrl;
  };

  return {
    isAuthorized,
    username,
    userProfileImage: userImageUrl(),
  };
};

const actionCreator = {
  logOutSuccess: logOutProcess,
};

const Header = (props) => {
  const {
    isAuthorized, username, userProfileImage, logOutSuccess,
  } = props;

  const renderUserImg = () => (
    userProfileImage
  );

  const handleOnLogOut = () => {
    logOutSuccess();
  };

  useEffect(() => {
    renderUserImg();
  }, [isAuthorized, userProfileImage]);

  const renderHeaderMenu = () => {
    // рендер если пользователь авторизирован
    if (isAuthorized) {
      return (
        <HeaderIsAuth>
          <HeaderCreateArticle>
            <NavLink to={createArticleUrl}>
              Create article
            </NavLink>
          </HeaderCreateArticle>

          <HeaderEditProfile>
            <NavLink to={editProfileUrl}>
              <HeaderUsername>{username}</HeaderUsername>
              <ArticlesUserImage src={renderUserImg()} />
            </NavLink>
          </HeaderEditProfile>

          <HeaderLogOut onClick={handleOnLogOut}>
            <NavLink to={signUpUrl}>
              Log Out
            </NavLink>
          </HeaderLogOut>
        </HeaderIsAuth>
      );
    }

    // рендер если пользователь неавторизирован
    return (
      <HeaderIsNotAuth>
        <NavLink to={signInUrl}>
          <HeaderSignIn>Sign In</HeaderSignIn>
        </NavLink>
        <NavLink to={signUpUrl}>
          <HeaderSignUp>Sign Up</HeaderSignUp>
        </NavLink>
      </HeaderIsNotAuth>
    );
  };

  return (
    <HeaderWrapper>
      <NavLink to={mainUrl}>
        <HeaderSignIn>Realworld Blog</HeaderSignIn>
      </NavLink>
      {renderHeaderMenu()}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  isAuthorized: propTypes.bool,
  username: propTypes.string,
  userProfileImage: propTypes.string,
  logOutSuccess: propTypes.func,
};

Header.defaultProps = {
  isAuthorized: false,
  username: null,
  userProfileImage: null,
  logOutSuccess: null,
};

export default connect(mapStateToProps, actionCreator)(Header);
