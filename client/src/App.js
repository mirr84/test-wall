import React from 'react';

import MyLayout from './components/common/Layout'

import Profile from './components/profile/Profile'
import Login from './components/profile/Login'
import Registration from './components/profile/Registration'

import Finance from './components/finance/Finance'
import Accounts from './components/finance/accounts/Accounts'
import Statistics from './components/finance/accounts/Statistics'
import Categories from './components/finance/categories/Categories'


import { Route, Switch } from "react-router-dom";
import { Result } from 'antd';

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

let idMenu = 0;

const menu = [
  {
    key: ++idMenu, title: "Профиль", url: "profile", a: 0,  // a 0 - всегда, 1 - только аутх, 2 - тольуо не аутъ
    sub: [
      {
        key: ++idMenu, title: "Авторизация", a: 2,
        sub: [
          { key: ++idMenu, title: "Вход", url: "login", a: 2 },
          { key: ++idMenu, title: "Регистрация", url: "registration", a: 2 }
        ]
      }
    ]
  },
  {
    key: ++idMenu, title: "Финансы", url: "finance", a: 1,
    sub: [
      {
        key: ++idMenu, title: "Счета", a: 1,
        sub: [
          { key: ++idMenu, title: "Список", url: "accounts", a: 1 },
          { key: ++idMenu, title: "Статистика", url: "statistics", a: 1 },
        ]
      },
      {
        key: ++idMenu, title: "Категории", a: 1,
        sub: [
          { key: ++idMenu, title: "Список", url: "categories", a: 1 },
        ]
      }
    ]
  }
]

const App = (props) => {
  return (<MyLayout
    menu={menu}
    content={
      <Switch>
        <Route exact path="/" component={() => <div> start </div>} />

        <Route exact path="/profile" component={() => <Profile />} />
        <Route exact path="/profile/login" component={() => <Login />} />
        <Route exact path="/profile/registration" component={() => <Registration />} />

        <Route exact path="/finance" component={() => <Finance />} />
        <Route exact path="/finance/accounts" component={() => <Accounts />} />
        <Route exact path="/finance/statistics" component={() => <Statistics />} />
        <Route exact path="/finance/categories" component={() => <Categories />} />

        <Route path="*" component={() => <Result status="404" title="404" subTitle="К сожалению, посещенная вами страница не существует." />} />
      </Switch>
    }
  />)
}

export default connector({ methods, component: App });