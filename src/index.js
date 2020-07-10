import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import reducers from './redux/reducers';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App dispatch={store.dispatch} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
