import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from 'react-router-dom';
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

const App = () => (
  <MainWrapper>
    <Router>
      <ContentHeader>
        <Header />
      </ContentHeader>
      <ContentWrapper>
        <Switch>
          <Route exact path={mainUrl} component={ArticlesList}>
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

          <Redirect to={mainUrl} />

        </Switch>
      </ContentWrapper>
    </Router>
  </MainWrapper>
);

export default App;
