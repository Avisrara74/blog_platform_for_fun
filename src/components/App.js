import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from 'react-router-dom';
import { signInSuccess } from '../redux/actions/auth';
import PrivateRoute from '../react-router/private-route';
import AuthRoute from '../react-router/auth-route';
import Header from './header';
import SignIn from './sign-in';
import SignUp from './sign-up';
import EditProfile from './edit-profile';
import ArticlesList from './articles-list';
import Article from './article';
import EditArticle from './edit-article';
import CreateArticle from './create-article';
import {
  MainWrapper, ContentHeader, ContentWrapper, ContentBody, ContentAuth,
} from '../styled-components';
import {
  mainUrl,
  createArticleUrl,
  signInUrl,
  signUpUrl,
  articleUrl,
  editArticleUrl,
  editProfileUrl,
} from '../routes';

const mapStateToProps = (state) => {
  const { userData, articles } = state;
  const props = {
    isAuthorized: userData.isAuthorized,
    userData,
    articles,
  };
  return props;
};

const App = (props) => {
  const { dispatch, isAuthorized } = props;
  const authorizationCheck = () => {
    if (localStorage.token === undefined) return;
    dispatch(signInSuccess({
      isAuthorized: true,
      token: localStorage.token,
      username: localStorage.username,
      userProfileImage: localStorage.userProfileImage,
    }));
  };

  useEffect(() => {
    if (!isAuthorized) authorizationCheck();
  }, [isAuthorized]);

  return (
    <MainWrapper>
      <Router>
        <ContentHeader>
          <Header />
        </ContentHeader>
        <ContentWrapper>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + mainUrl}>
              <ContentBody>
                <ArticlesList />
              </ContentBody>
            </Route>

            <AuthRoute path={signInUrl}>
              <ContentAuth>
                <SignIn />
              </ContentAuth>
            </AuthRoute>

            <AuthRoute path={signUpUrl}>
              <ContentAuth>
                <SignUp />
              </ContentAuth>
            </AuthRoute>

            <PrivateRoute path={editProfileUrl}>
              <ContentAuth>
                <EditProfile />
              </ContentAuth>
            </PrivateRoute>

            <PrivateRoute path={createArticleUrl}>
              <ContentBody>
                <CreateArticle />
              </ContentBody>
            </PrivateRoute>

            <Route path={editArticleUrl()}>
              <ContentBody>
                <EditArticle />
              </ContentBody>
            </Route>

            <Route path={articleUrl()}>
              <ContentBody>
                <Article />
              </ContentBody>
            </Route>

            <Route path="*">
              <ContentBody>
                <ArticlesList />
              </ContentBody>
            </Route>

            <Redirect to={mainUrl} />
          </Switch>
        </ContentWrapper>
      </Router>
    </MainWrapper>
  );
};

App.propTypes = {
  dispatch: propTypes.func,
  isAuthorized: propTypes.bool,
};

App.defaultProps = {
  dispatch: null,
  isAuthorized: false,
};

export default connect(mapStateToProps, null)(App);
