import React from 'react';

import Form from './components/Form'
import MyLayout from './components/Layout'
import List from './components/List'

import {connector} from "./store/utils/simpleConnector";
import axios from 'axios'

class App extends React.Component {

  componentDidMount() {
    this.fetchAllBricks()
  }

  state = {
    bricks: []
  }  

  fetchAllBricks = () =>
    axios.get(`/api/bricks`)
      .then(resp => resp.data)
      .then(bricks => { this.setState({ bricks }) })

  addNewBrick = (text) =>
    axios.post(`/api/bricks`, { text })
      .then(resp => resp.data)
      .then(() => this.fetchAllBricks())

  render() {

    const { bricks } = this.state

    // console.log(this.props.state)
    // console.log(this.props.dispatch)

    return (

      <MyLayout content={
        <div>
          App
          <Form addNewBrick={this.addNewBrick} />
          <List bricks={bricks} />
        </div>
      } />
    )
  }

}

export default connector({component: App});
