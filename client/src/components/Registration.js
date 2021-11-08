import React from 'react';

import { connector } from "./../store/utils/simpleConnector";

import { Input, Button } from 'antd';

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
      console.log('init Registration', props);
  }
}

const Registration = ({ state, dispatch, history, ...props }) => {
  
  return (
    <div>
      Registration
    </div>
  )

}

export default connector({ methods, component: Registration });