import React from 'react';

import { connector } from "./../store/utils/simpleConnector";

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom"

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const methods = {
    componentWillMount(props) {
        console.log('init MyLayout', props);
    }
}

const MyLayout = ({menuTop, state, dispatch, history, ...props}) => {

    

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    {
                        menuTop.map(
                            ({ key, title, url }) => <Menu.Item key={key} onClick={() => { history.push(`/${url}`) }}>{title}</Menu.Item>
                        )
                    }
                </Menu>
            </Header>

            <Content className="site-layout-background">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout>
                    <Sider width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content className="site-layout-content" style={{ padding: 10, minHeight: "280" }}>
                        {props.content}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center', padding: 10 }}>Footer</Footer>
        </Layout>
    )

}

export default connector({ methods, component: MyLayout });