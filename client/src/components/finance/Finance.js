import React, {useState} from 'react';

import { connector } from "./../../store/utils/simpleConnector";
import axios from 'axios';

import { Input, Button } from 'antd';

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Finance', props);
    state.authReducer.isAuth || history.push(`/profile/login`)
  }
}

const Finance = ({ state, dispatch, history, ...props }) => {

  const isAuth = state.authReducer.isAuth

  return (
    <div>
        Finance     
    </div>
  )

}

export default connector({ methods, component: Finance });