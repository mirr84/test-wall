import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

import 'antd/dist/antd.css';
import './index.css';

import App from './App';

axios.interceptors.request.use(
  (config) => {
      config.headers.token = "token";
      return Promise.resolve(config);
  }
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);