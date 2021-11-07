import React from 'react';

import MyLayout from './components/Layout'

import { Route, Switch } from "react-router-dom";
import { Result, Button } from 'antd';

import { connector } from "./store/utils/simpleConnector";

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
    menu={
      [
        { 
          key: 1000, title: "main", url: "main_url",
          sub: [
            { 
              key: 100, title: "subtitle1",
              sub: [
                { key: 10, title: "opin1", url: "op1_url" },
                { key: 20, title: "opin2", url: "op2_url" }
              ]
            },
            { 
              key: 200, title: "subtitle2",
              sub: [
                { key: 30, title: "opin3", url: "op3_url" },
                { key: 40, title: "opin4", url: "op4_url" }
              ]
            }
          ]
        },
        { 
          key: 2000, title: "home", url: "home_url"
        },
        {
          key: 3000, title: "account", url: "account_url"
        },
      ]
    }
    content={
        <Switch>   
          <Route exact path="/" component={() => <div> start </div>} />   

          <Route exact path="/main_url" component={() => <div> main </div>} />
          <Route exact path="/home_url" component={() => <div> home </div>} />
          <Route exact path="/account_url" component={() => <div> account </div>} />

          <Route path="*" component={() => <Result status="404" title="404" subTitle="К сожалению, посещенная вами страница не существует." />} />
        </Switch>
    }
  />)
}

export default connector({ methods, component: App });