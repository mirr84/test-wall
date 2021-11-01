import React from 'react';

import Form from './components/Form'
import MyLayout from './components/Layout'
import List from './components/List'

import { Route, Switch } from "react-router-dom";

import { connector } from "./store/utils/simpleConnector";
import axios from 'axios'

{/* <div>
    App
    <Form addNewBrick={this.addNewBrick} />
    <List bricks={bricks} />
  </div>   */}

const methods = {
  componentWillMount(props) {
    console.log('init App', props);
  }
}

// const fetchAllBricks = () =>
//   axios.get(`/api/bricks`)
//     .then(resp => resp.data)
//     .then(bricks => { this.setState({ bricks }) })

// const addNewBrick = (text) =>
//   axios.post(`/api/bricks`, { text })
//     .then(resp => resp.data)
//     .then(() => this.fetchAllBricks())

const App = (props) => {
  return (<MyLayout
    menuTop={
      [
        { key: 1, title: "1111", url: "1" },
        { key: 2, title: "home", url: "home" },
        { key: 3, title: "account", url: "account" },
      ]
    }
    menuLeft={
      []
    }
    content={
        <Switch>
          <Route  path="/" component={() => <div> empty </div>} />
          <Route  path="/home" component={() => <div> home </div>} />
          <Route  path="/account" component={() => <div> account </div>} />
        </Switch>
    }
  />)
}

export default connector({ methods, component: App });