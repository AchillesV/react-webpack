import React from 'react';
import { Input, Button } from 'antd';


function LoginInfo() {

  return (
    <div className='login-info'>
      <Input  
        placeholder="账号"
      />
      
      <Input.Password  
        placeholder="密码"
      />
      <Button
        type='primary'
      >
        登录
      </Button>
    </div>
  )
}

export default LoginInfo;