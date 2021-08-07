import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import UstaraLogo from '../assets/ustralogo.png';
import { Category } from './Category';
import { ProductList } from './ProductList';
import { GlobalContext } from '../Provider/GlobalContext';
const { Header, Sider, Content } = Layout;

export const SideBar = () => {
  const context = useContext(GlobalContext);
  const [collapsed, setCollapsed] = useState(false);

  const getSelectedItemIndex = () => {
    const categories = context.categories || [];
    const selectedCategory = context.category;
    return categories.findIndex(category => selectedCategory.category_id === category.category_id);
  }
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const onChangeFromMenu = (category) => {
    context.setCategory(category);
  }
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: "#fff"}}>
          <img className="logo" src={UstaraLogo} alt="ustara-logo" style={{width: "60px", height: "60px"}}/>
          <Menu mode="inline" defaultSelectedKeys={['0']} selectedKeys={[String(getSelectedItemIndex())]}>
            {context.categories.map((category, index) => {
              return (
                <Menu.Item key={index} icon={<UploadOutlined />} onClick={() => onChangeFromMenu(category)}>
                  {category.category_name}
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
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
