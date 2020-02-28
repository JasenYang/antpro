import React from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';
import styles from './index.less';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    sorter: true,
    // render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'creater',
    dataIndex: 'creater',
    width: '20%',
  },
  {
    title: 'description',
    dataIndex: 'description',
    width: '20%',
  },
  {
    title: 'ctime',
    dataIndex: 'ctime',
    width: '20%',
  },
  {
    title: 'status',
    dataIndex: 'status',
  },
];

class App extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({
      loading: true,
    });
    reqwest({
      url: 'http://10.26.29.81:9081/cube/getAllCubeInfo',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then(data => {
      const pagination = { ...this.state.pagination }; // Read total count from server
      // pagination.total = data.totalCount;

      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.data,
        pagination,
      });
    });
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-ajax">
      <App />
    </div>
  </div>
);
