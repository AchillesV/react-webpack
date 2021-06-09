import React from 'react';
import LoginHeader from './LoginHeader';
import LoginInfo from './LoginInfo';
import { Layout } from 'antd';

import './index.less';

const { Header, Footer, Content } = Layout;

function Login() {
  return (
    <div className='login-container'>
      <Layout>
      <Header>
        <LoginHeader />
      </Header>
      <Content>
        <LoginInfo />
      </Content>
      <Footer>
        <div>底部</div>
      </Footer>
      </Layout>
    </div>
  )
}

export default Login;