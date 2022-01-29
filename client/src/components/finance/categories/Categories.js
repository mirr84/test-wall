import React, { useState } from 'react';

import { connector } from "./../../../store/utils/simpleConnector";

import { Form, Input, Button, Checkbox } from 'antd';
import { notification } from 'antd';

import CategoriesItem from "./CategoriesItem";

import { Row, Col, Divider, Card } from 'antd';

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Categories', props);
    state.authReducer.isAuth || history.push(`/profile/login`)
  }
}

const style = { padding: '0px', width: "100%" };

const listCategories = [
  { direct: 1, title: 'доход1' },
  { direct: -1, title: 'расход1' },
  { direct: 0, title: 'общая1' },
]

const getCategories = (direct = 1) => {
  return listCategories.filter((c) => c.direct === direct)
}

const Categories = ({ state, dispatch, history, ...props }) => {

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={8}>
        <Divider orientation="left">Доходы</Divider>
        <Card bordered={false}>
            { getCategories(1).map((c) => <Card.Grid hoverable style={style} > <CategoriesItem categorie={c} /> </Card.Grid> ) }
        </Card>  
        </Col>
        <Col className="gutter-row" span={8}>
          <Divider orientation="left">Общие</Divider>
          <Card bordered={false}>
            { getCategories(0).map( (c) => <Card.Grid hoverable style={style}> <CategoriesItem categorie={c} /> </Card.Grid> ) }
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Divider orientation="left">Расходы</Divider>
          <Card bordered={false}>
            { getCategories(-1).map( (c) => <Card.Grid hoverable style={style}> <CategoriesItem categorie={c} /> </Card.Grid> ) }
          </Card>
        </Col>
      </Row>
    </div>
  )

}

export default connector({ methods, component: Categories });