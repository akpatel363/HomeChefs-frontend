import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import { authSuccess } from './store/actions/auth';

const store = configureStore();

const data = JSON.parse(localStorage.getItem('data'));
if (data) store.dispatch(authSuccess(data));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
