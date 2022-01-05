import React, { useState } from 'react';

import { connector } from "./../../../store/utils/simpleConnector";

import { Form, Input, Button, Checkbox } from 'antd';
import { notification } from 'antd';

import { Table, Tag, Space } from 'antd';

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Statistics', props);
    state.authReducer.isAuth || history.push(`/profile/login`)
  }
}

const Statistics = ({ state, dispatch, history, ...props }) => {

  return (
    <div>
      Statistics
    </div>
  )

}

export default connector({ methods, component: Statistics });