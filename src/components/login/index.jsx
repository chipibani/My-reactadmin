import React, { Component } from "react";

import { Form, Input, Button, Icon } from "antd";

import logo from "./logo.png";

import "./index.less";

@Form.create()
class Login extends Component {
  validator = (rule, value, callback)=> {

   const name = rule.field === 'username' ? '用户名' : '密码';

   const reg = /^\w+$/

    if(!value){
      //输入的值为空
      callback(`${name}不能为空`);
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`);
    } else if (value.length > 15) {
      callback(`${name}必须小于15位`);
    } else if (!reg.test(value)) {
      callback(`${name}只能包含英文、数字、下划线`);
    };

    //必须调用
    callback();
  }
  render() {
     const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form className="login-form">
            <Form.Item>
              {
                getFieldDecorator(
                  'username',
                  {
                    rules: [
                      // {
                      //   required:true,
                      //   message:'用户名不能为空'
                      // },
                      // {
                      //   min:4,
                      //   message:'用户名必须大于3'
                      // },
                      // {
                      //   max:15,
                      //   message: '用户名必须小于15'
                      // },
                      // {
                      //   pattern: /^\w+$/,
                      //   message: '用户名只能包含数字  字母 下划线'
                      // }
                      {
                        validator:this.validator
                      }
                    ]
                  }
                )(
                  <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator(
                  'password',
                  {
                    rules:[
                      {
                        validator:this.validator
                      }
                    ]
                  }
                )(
                  <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="密码"
              />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button className="login-form-btn" type="primary">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
