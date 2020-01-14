import React, { Component } from "react";

import { Form, Input, Button, Icon, message } from "antd";

import axios from "axios"

import logo from "./logo.png";

import "./index.less";

import { Redirect } from 'react-router-dom';

const { Item } = Form;

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
  };

  login = e => {
    e.preventDefault();
    //校验表单
    //搜集数据
    //发送请求,请求登录
    //校验表单并收集数据
    this.props.form.validateFields((err,values) => {
      
      if(!err){
        //表单校验成功
        const { username, password } = values;
        //发送请求,请求登录
        axios.post('/api/login',{username,password})
        .then((response) => {
          if (response.data.status === 0){
            //登陆成功
            //return <Redirect to="/"/>(只能用于render方法中)
            this.props.history.push('/');
          }else{
            //登陆失败
          }
        })
        .catch((err) => {

        })
      }
    })
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
          <Form className="login-form" onSubmit={this.login}>
            <Item>
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
            </Item>
            <Item>
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
            </Item>
            <Item>
              <Button className="login-form-btn" type="primary" htmlType="submit">
                登录
              </Button>
            </Item> 
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
