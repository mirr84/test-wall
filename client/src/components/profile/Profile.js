import React from 'react';

import { connector } from "./../../store/utils/simpleConnector";
import axios from 'axios';

import { Button } from 'antd';

const getCheckAuth = (dispatch) =>
  axios.get(`/api/users/check`)
    .then(resp => {})
    .catch(err => {
      dispatch.setter('authReducer', { token: null, isAuth: false })
    })

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Profile', props);
    state.authReducer.isAuth || history.push(`/profile/login`)
  }
}

const onLogout = (dispatch, history) => {
  dispatch.setter('authReducer', { token: null, isAuth: false })
  history.push(`/profile/login`)
}

const Profile = ({ state, dispatch, history, ...props }) => {

  const isAuth = state.authReducer.isAuth

  return (
    <div>
      {
        isAuth && <Button onClick={ ()=>onLogout(dispatch, history) }>Выйти</Button> || history.push(`/profile/login`)
      }      
    </div>
  )

}

export default connector({ methods, component: Profile });