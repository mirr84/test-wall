import React from 'react';

import { connector } from "./../../store/utils/simpleConnector";
import axios from 'axios';

import { Input, Button } from 'antd';

const getCheckAuth = (dispatch) =>
  axios.get(`/api/users/check`)
    .then(resp => {})
    .catch(err => {
      dispatch.setter('authReducer', { token: null, isAuth: false })
    })

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Profile', props);

    getCheckAuth(dispatch)
  }
}

const onLogout = (dispatch, history) => {
  dispatch.setter('authReducer', { token: null, isAuth: false })
  history.push(`/profile/login`)
}

const Profile = ({ state, dispatch, history, ...props }) => {

  return (
    <div>
      <Button onClick={ ()=>onLogout(dispatch, history) }>
        Выйти
      </Button>
    </div>
  )

}

export default connector({ methods, component: Profile });