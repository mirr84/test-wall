import React from 'react';

import { connector } from "./../../../store/utils/simpleConnector";

import { Button } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { Row, Col, Divider } from 'antd';

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init CategoriesItem', props);
  }
}
const CategoriesItem = ({ state, dispatch, history, ...props }) => {

  const categorie = props.categorie

  return (
    <div>      
      {
        categorie.title
      }
      {
        (categorie.direct === 0 || categorie.direct === -1) && <Button type="primary" size="small" icon={<ArrowLeftOutlined />} />   
      }
      {
        (categorie.direct === 0 || categorie.direct === 1) && <Button type="primary" size="small" icon={<ArrowRightOutlined />} />   
      }
    </div>
  )

}

export default connector({ methods, component: CategoriesItem });