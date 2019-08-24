const usersModel = require('../models/users')
const tools = require('../utils/tools')

module.exports = {
  async signup(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8') // 定义返回的字符串为json字符串
    let {username, password} = req.body

    // 判断用户是否存在
    let result = await usersModel.findOne(username)
    if(!result) {
      // 密码加密
      let newPassword = await tools.crypt(password)
      // console.log(newPassword)

      // res.send('signup')
      // 保存数据到数据库
      await usersModel.save({
        username,
        password: newPassword
      }) //不用担心插入别的，因为传进去之后被解构了
      // console.log(result)
      // res.json(result)

      // 给前端返回接口
      // 由于模板在app.js中定义过了，所以不需要加载
      res.render('success', {
        data: JSON.stringify({
          msg: '用户注册成功'
        })
      })
    }
    res.render('fail', {
      data: JSON.stringify({
        msg: '用户名已存在'
      })
    })
  },
  
  async signin(req, res, next) {
    res.set('content-type', 'application/json;charset=utf-8') // 定义返回的字符串为json字符串
    let {username, password} = req.body
    // 从数据库中根据用户名取出用户信息
    let result = await usersModel.findOne(username)
    // console.log(result)
    if(result) {
      if(await tools.compare(password, result.password)) {
        // res.cookie('name', 'xxp') // 后端种了个cookie
        // req.session 可以贯穿express所有的中间件，不用传递，只要req在
        req.session.username = username // 用中间件生成了个cookie
        res.render('success', {
          data: JSON.stringify({
            msg: '用户登录成功',
            username
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            msg: '账户或密码错误'
          })
        })
      }
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '账户或密码错误'
        })
      })
    }
  },

  async isSignin(req, res, next) {
    // console.log(1)
    res.set('content-type', 'application/json;charset=utf-8') // 定义返回的字符串为json字符串
    let username = req.session.username
    if (username) {
      // console.log(req.url)
      res.render('success', {
        data: JSON.stringify({
          msg: '用户有权限',
          username
        })
      })
      // next()
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '用户没有权限',
        })
      })
    }
  },

  async signout(req, res, next) {
    // console.log(2)
    req.session = null
    res.render('success', {
      data: JSON.stringify({
        msg: '用户登出成功',
      })
    })
  }
}