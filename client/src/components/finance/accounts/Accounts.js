import React, { useState, useEffect } from 'react';

import { connector } from "./../../../store/utils/simpleConnector";
import axios from 'axios';

import { Table } from 'antd';

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

const Accounts = ({ state, dispatch, history, ...props }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPaination] = useState({})

  useEffect(() => getData(), []);

  const handleTableChange = (pagination, filters, sorter) => {

    console.log(pagination, filters, sorter)

    getData(pagination, filters, sorter);
  }

  const getData = (pagination = {}, filters = {}, sorter = {}) => {
    setLoading(true);

    const { current, pageSize } = pagination;
    const { order, field } = sorter;

    axios.get(`/api/accounts/list`, { params: { current, pageSize, order, field } })
      .then(({ data }) => {
        setData(data)
      })
      .catch((err) => {
        setData([])
      })
      .finally(
        () => {
          setLoading(false);
        }
      )
  }

  return (
    <>

      <Table
        columns={columns}
        rowKey={record => record.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        size="small"
      />

    </>
  )

}

export default connector({ methods, component: Accounts });