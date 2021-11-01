import React from 'react';

import {connector} from "./../store/utils/simpleConnector";

import { Input, Button } from 'antd';

class Form extends React.Component {
  
  state = {
    text: ""
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onButtonClick = () => {
    this.props.addNewBrick(this.state.text)
  }

  render () {
    return (
      <div>
        <Input type="text" value={this.state.text} name="text" onChange={this.onInputChange} />
        <Button type="primary" onClick={this.onButtonClick} > send message </Button>
      </div>
    )
  }

}

export default connector({component: Form});