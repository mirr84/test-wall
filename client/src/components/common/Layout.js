import React from 'react';

import { connector } from "./../../store/utils/simpleConnector";
import { useLocation } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';

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

const getMenuTop = (menu, isAuth = 0) => {
    return (menu || []).filter(a => a.a === isAuth || a.a === 0)
}

const getMenuLeft = (menu, url, isAuth = 0) => {
    return (getMenuTop(menu, isAuth).find(a => a.url === url.first) && getMenuTop(menu, isAuth).find(a => a.url === url.first).sub || [])
        .filter(a => a.a === isAuth || a.a === 0)
}

const getSelectAndOpen = (menu, url, isAuth = 0) => {
    const selectTop = getMenuTop(menu, isAuth).find(a => a.url === url.first) && getMenuTop(menu, isAuth).find(a => a.url === url.first).key
    let selectLeft = null
    let openLeft = null

    let title1 = null
    let title2 = null
    let title3 = null
    let breadcrumb = []

    let sub = getMenuLeft(getMenuTop(menu, isAuth), url, isAuth)
    for (let i = 0; i < sub.length; i++) {
        for (let j = 0; j < sub[i].sub.length; j++) {
            if (sub[i].sub[j].url === url.second) {
                selectLeft = sub[i].sub[j].key
                openLeft = sub[i].key   
                title2 = sub[i].title             
                title3 = sub[i].sub[j].title                
            }
        }
    }

    title1 = menu.find(a => a.url === url.first) && menu.find(a => a.url === url.first).title

    // debugger

    if (title1) breadcrumb.push(title1)
    if (title2) breadcrumb.push(title2)
    if (title3) breadcrumb.push(title3)

    return { selectTop, selectLeft, openLeft, breadcrumb }
}

const methods = {
    componentWillMount({ menu, state, dispatch, history, ...props }) {
        console.log('init MyLayout', props);
    }
}

const MyLayout = ({ menu, state, dispatch, history, ...props }) => {

    const location = useLocation();

    // 0 - всегда, 1 - только аутх, 2 - тольуо не аутъ
    const isAuth = !!state.authReducer.isAuth ? 1 : 2;

    return (
        <Layout>
            <Header className="header">
                <div className="logo" onClick={
                    () => {
                        history.push(`/`)
                    }
                } />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${getSelectAndOpen(menu, getUrlParam(location), isAuth).selectTop}`]}>
                    {
                        getMenuTop(menu, isAuth).map(
                            ({ key, title, url }) => (
                                <Menu.Item key={key}
                                    onClick={() => {
                                        history.push(`/${url}`)
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
                    getSelectAndOpen(menu, getUrlParam(location), isAuth).breadcrumb.length > 0 &&
                    <Breadcrumb>
                        {
                            getSelectAndOpen(menu, getUrlParam(location), isAuth).breadcrumb.map(
                                (a, idx) => <Breadcrumb.Item key={idx}>{a}</Breadcrumb.Item>
                            )
                        }
                    </Breadcrumb>
                }
                <Layout className="content-layout">
                    {
                        getMenuLeft(menu, getUrlParam(location), isAuth).length > 0 && <Sider width={200} style={{ marginLeft: 10 }}>
                            <Menu
                                mode="inline"
                                // mode="vertical"
                                defaultSelectedKeys={[`${getSelectAndOpen(menu, getUrlParam(location), isAuth).selectLeft}`]}
                                defaultOpenKeys={[`${getSelectAndOpen(menu, getUrlParam(location), isAuth).openLeft}`]}
                                style={{ height: '100%' }}
                            >
                                {
                                    getMenuLeft(menu, getUrlParam(location), isAuth)
                                        .map(
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
                    <Content className="site-layout-content" style={{ marginLeft: 10, padding: 10, minHeight: "280" }}>
                        {props.content}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center', padding: 10 }}>Footer</Footer>
        </Layout>
    )

}

export default connector({ methods, component: MyLayout });