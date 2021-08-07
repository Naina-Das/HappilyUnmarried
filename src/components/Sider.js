import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React from 'react';
import UstaraLogo from '../assets/ustralogo.png';
import { Category } from './Category';
import { ProductList } from './ProductList';
const { Header, Sider, Content } = Layout;

class SideBar extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{backgroundColor: "#fff"}}>
          <img className="logo" src={UstaraLogo} alt="ustara-logo" style={{width: "60px", height: "60px"}}/>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Face And Body
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Hair
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              Skin
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
              Shave
            </Menu.Item>
            <Menu.Item key="5" icon={<UploadOutlined />}>
              Featured Bundle
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Category/>
            <ProductList/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default SideBar;