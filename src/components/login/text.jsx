import React from 'react';
import axios from 'axios';
import { message } from 'antd';


export default function Test () {


  //配置axios拦截器
  
  //自己创建axios实例,可以修改axios默认配置
  const axiosInstance = axios.create({
    baseURL: '/api', //基础路径  后面所有路径都会以 baseurl 开头
    timeout: 10000, //10s请求超过时间  请求一旦超过十秒没响应,就会自动中断请求 
    headers: {//公共的请求头,请求必须写死

    }
  })

  //设置拦截器  1.请求拦截器(发送请求之前调用) 2.响应拦截器(返回响应之后触发axiosInstance.then/catch之前调用)
  //请求拦截器
  axiosInstance.interceptors.request.use(
    //成功
    (config) => {
      //config是一个对象 里面包含所有发送请求的配置
      //修改config配置 添加动态请求头参数

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      if (config.method === 'post'){
        //修改请求参数
        const keys = Object.keys(config.data);
        const data = keys
          .reduce((prev,curr) => {
            prev += `&${curr}=${config.data[curr]}`;
            return prev;
          },'')
          .slice(1)
          config.data = data;
          config.headers['content-type'] = 'application/x-www-form-urlencoded';
      }
      return config;
    },
    //失败
    // (error) => {
    //   //error失败的原因
    //   return Promise.reject(err);
    // }
  )
  //响应拦截器
  axiosInstance.interceptors.response.use(
    //请求成功
    (response) => {
      return response;
    },
    //请求失败
    (err) => {
      return Promise.reject(err);
    }
  )


  let token = '';
  let id = '';
    const handleClick1 = () => {
      axiosInstance({
        method: 'POST',
        url: '/login',
        data: {
          username: 'admin',
          password: 'admin'
        },
        //data: 'username=admin&pasword=admin',
        // headers:{
        //    'content-type': 'application/x-www-form-urlencoded'
        // }
      })
      .then(response =>{
        if (response.data.status ===0) {
          token = response.data.data.token;
          message.success('登录成功');
        }else {
          console.log('weweewew')
          message.error(response.data.msg);
        }
      })
      .catch(err =>{
        message.error('网络错误')
      });
    };
    const handleClick2 = () => {
      axiosInstance({
      method: 'POST',
      url: '/category/add',
      data: {
        categoryName: '手机',
      },
      headers: {
        authorization: `Bearer ${token}`
      }
    }) 
    .then(response =>{
      if (response.data.status ===0) {
        id = response.data.data._id;
        message.success('添加成功');
      }else {
        message.error(response.data.msg);
      }
    })
    .catch(err =>{
      message.error('网络错误')
    });
  };
    const handleClick3 = () => {
      axiosInstance({
        method: 'POST',
        url: '/category/delete',
        data: {
          categoryId: id
        },
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response =>{
        
        if (response.data.status ===0) {
          message.success('删除分类成功');
        }else {
          message.error(response.data.msg);
        }
      })
      .catch(err =>{
        message.error('网络错误')
      });
    };

    return(
      <div>
        <button onClick={handleClick1}>按钮1</button>
        <button onClick={handleClick2}>按钮2</button>
        <button onClick={handleClick3}>按钮3</button>
      </div>
  )
}



// export default function Test () {

//   let token = '';
//   let id = '';
//     const handleClick1 = () => {
//       axios({
//         method: 'POST',
//         url: '/api/login',
//         data: {
//           username: 'admin',
//           password: 'admin'
//         }
//       })
//       .then(response =>{
//         if (response.data.status ===0) {
//           token = response.data.data.token;
//           message.success('登录成功');
//         }else {
//           message.error(response.data.msg);
//         }
//       })
//       .catch(err =>{
//         message.error('网络错误')
//       });
//     };
//     const handleClick2 = () => {
//       axios({
//       method: 'POST',
//       url: '/api/category/add',
//       data: {
//         categoryName: '手机',
//       },
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     }) 
//     .then(response =>{
//       if (response.data.status ===0) {
//         id = response.data.data._id;
//         message.success('添加成功');
//       }else {
//         message.error(response.data.msg);
//       }
//     })
//     .catch(err =>{
//       message.error('网络错误')
//     });
//   };
//     const handleClick3 = () => {
//       axios({
//         method: 'POST',
//         url: '/api/category/delete',
//         data: {
//           categoryId: id
//         },
//         headers: {
//           authorization: `Bearer ${token}`
//         }
//       })
//       .then(response =>{
        
//         if (response.data.status ===0) {
//           message.success('删除分类成功');
//         }else {
//           message.error(response.data.msg);
//         }
//       })
//       .catch(err =>{
//         message.error('网络错误')
//       });
//     };

//     return(
//       <div>
//         <button onClick={handleClick1}>按钮1</button>
//         <button onClick={handleClick2}>按钮2</button>
//         <button onClick={handleClick3}>按钮3</button>
//       </div>
//   )
// }
