import React, { useState } from 'react';

import { connector } from "./../../../store/utils/simpleConnector";
import axios from 'axios';

import { Table } from 'antd';

const getDate = (dispatch, pagination, filters, sorter) => {

  dispatch.setter('accountsReducer', { loading: true, pagination, filters, sorter })

  axios.get(`/api/accounts/list`, {params: {...pagination, ...filters, ...sorter} })
    .then(({data}) => {
      console.log("resp - " + JSON.stringify(data))
      dispatch.setter('accountsReducer', { data })
      dispatch.setter('accountsReducer', { loading: false })
    })
    .catch(err => {
      dispatch.setter('accountsReducer', { loading: false })
    })
}

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Accounts', props);
    state.authReducer.isAuth || history.push(`/profile/login`);
  }
}

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    sorter: true,
    render: id => `${id}`,
  },
  {
    title: 'title',
    dataIndex: 'title',
    sorter: true,
    render: title => `${title}`,
  },
];

const handleTableChange = (dispatch, pagination, filters, sorter) => {
  getDate(dispatch, pagination, filters, sorter);
}


const Accounts = ({ state, dispatch, history, ...props }) => {

  return (
    <Table
      columns={columns}
      rowKey={record => record.uuid}
      dataSource={state.accountsReducer.data || []}
      pagination={state.accountsReducer.pagination}
      loading={state.accountsReducer.loading}
      onChange={(pagination, filters, sorter) => handleTableChange(dispatch, pagination, filters, sorter)}
      size="small"
    />
  )

}

export default connector({ methods, component: Accounts });