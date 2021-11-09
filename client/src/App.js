import React from 'react';

import MyLayout from './components/Layout'

import Profile from './components/profile/Profile'
import Login from './components/profile/Login'
import Registration from './components/profile/Registration'

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

const menu = [
  { 
    key: 1000, title: "Профиль", url: "profile", a: 0,  // a 0 - всегда, 1 - только аутх, 2 - тольуо не аутъ
    sub: [
      { 
        key: 100, title: "Профиль", a: 2,
        sub: [
          { key: 10, title: "Авторизация", url: "login", a: 2 },
          { key: 20, title: "Регистрация", url: "registration", a: 2 }
        ]
      }
    ]
  },
  { 
    key: 2000, title: "home", url: "home_url", a: 1,
    sub: [
      { 
        key: 100, title: "subtitle3", a: 1,
        sub: [
          { key: 50, title: "opin5", url: "op1_url", a: 1 },
          { key: 60, title: "opin6", url: "op2_url", a: 1 }
        ]
      }
    ]
  },
  {
    key: 3000, title: "account", url: "account_url"
  },
]

const App = (props) => {
  return (<MyLayout
    menu={menu}
    content={
        <Switch>   
          <Route exact path="/" component={() => <div> start </div>} />   

          <Route exact path="/main_url" component={() => <div> main </div>} />
          <Route exact path="/main_url/op1_url" component={() => <div> op1_url </div>} />

          <Route exact path="/profile" component={() => <Profile/> } />
          <Route exact path="/profile/login" component={() => <Login/> } />
          <Route exact path="/profile/registration" component={() => <Registration/> } />          

          <Route exact path="/home_url" component={() => <div> home </div>} />
          <Route exact path="/account_url" component={() => <div> account </div>} />

          <Route path="*" component={() => <Result status="404" title="404" subTitle="К сожалению, посещенная вами страница не существует." />} />
        </Switch>
    }
  />)
}

export default connector({ methods, component: App });