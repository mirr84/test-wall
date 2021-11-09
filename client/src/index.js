import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducers/index';
import {getStorage} from "./store/utils/getStorage";

import 'antd/dist/antd.css';
import './index.css';

import App from './App';

const store = createStore(reducer);
export default store;
store.subscribe(() => getStorage().storage.setItem('store', JSON.stringify(store.getState())));

axios.interceptors.request.use(
  (config) => {
    if (store.getState().authReducer.token) config.headers.token = store.getState().authReducer.token;
    return Promise.resolve(config);
  }
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);