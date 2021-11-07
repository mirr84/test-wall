import React from 'react';

import { connector } from "./../store/utils/simpleConnector";
import { useLocation } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function getUrlParam(location) {
    const aa = location.pathname.split('/')
    aa.shift()
    const length = aa.length
    let first = null;
    let second = null;
    if (length > 0) {
        first = aa[0]
    }
    if (length > 1) {
        second = aa[1]
    }
    return { length, first, second };
}

const getMenuTop = (menu) => {
    return menu || []
}

const getMenuLeft = (menu, url) => {
    return menu.find(a => a.url === url.first) && menu.find(a => a.url === url.first).sub || []
}

const getSelectAndOpen = (menu, url) => {
    const selectTop = menu.find(a => a.url === url.first) && menu.find(a => a.url === url.first).key
    let selectLeft = null
    let openLeft = null

    let title1 = null
    let title2 = null
    let breadcrumb = []

    let sub = getMenuLeft(menu, url)
    for (let i = 0; i < sub.length; i++) {
        for (let j = 0; j < sub[i].sub.length; j++) {
            if (sub[i].sub[j].url === url.second) {
                selectLeft = sub[i].sub[j].key
                openLeft = sub[i].key
                title2 = sub[i].sub[j].title
            }
        }
    }

    title1 = menu.find(a => a.url === url.first) && menu.find(a => a.url === url.first).title

    if (title1) breadcrumb.push(title1)
    if (title2) breadcrumb.push(title2)

    return { selectTop, selectLeft, openLeft, breadcrumb }
}

const methods = {
    componentWillMount({ menu, state, dispatch, history, ...props }) {
        console.log('init MyLayout', props);
    }
}

const MyLayout = ({ menu, state, dispatch, history, ...props }) => {

    const location = useLocation();

    return (
        <Layout>
            <Header className="header">
                <div className="logo" onClick = {()=>history.push(`/`)} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${getSelectAndOpen(menu, getUrlParam(location)).selectTop}`]}>
                    {
                        getMenuTop(menu).map(
                            ({ key, title, url }) => (
                                <Menu.Item key={key}
                                    onClick={() => {
                                        history.push(`/${url}`)
                                        dispatch.setter('menuReducer', { menuTop: key })
                                    }}
                                >
                                    {title}
                                </Menu.Item>
                            )
                        )
                    }
                </Menu>
            </Header>

            <Content className="site-layout-background">
                {
                    getSelectAndOpen(menu, getUrlParam(location)).breadcrumb.length > 0 &&
                    <Breadcrumb>
                        {
                            getSelectAndOpen(menu, getUrlParam(location)).breadcrumb.map(
                                a => <Breadcrumb.Item>{a}</Breadcrumb.Item>
                            )
                        }
                    </Breadcrumb>
                }
                <Layout>
                    {
                        getMenuLeft(menu, getUrlParam(location)).length > 0 && <Sider width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[`${getSelectAndOpen(menu, getUrlParam(location)).selectLeft}`]}
                                defaultOpenKeys={[`${getSelectAndOpen(menu, getUrlParam(location)).openLeft}`]}
                                style={{ height: '100%' }}
                            >
                                {
                                    getMenuLeft(menu, getUrlParam(location)).map(
                                        a => (
                                            <SubMenu key={a.key} title={a.title}>
                                                {
                                                    a.sub.map(b => (
                                                        <Menu.Item key={b.key}
                                                            onClick={() => {
                                                                history.push(`/${getUrlParam(location).first}/${b.url}`)
                                                            }} >
                                                            {b.title}
                                                        </Menu.Item>
                                                    )
                                                    )
                                                }
                                            </SubMenu>
                                        )
                                    )
                                }
                            </Menu>
                        </Sider>
                    }
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