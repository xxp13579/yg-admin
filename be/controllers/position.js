const posModel = require('../models/position')
const moment = require('moment')

module.exports = {
  async list(req, res, next) {
    // res.send('ok.')
    // let {start, count} = req.query
    let {list, total} = await posModel.find(req.query) // 返回的是一个promise
    // console.log(result)
    if(await list) {
      res.render('success', {
        data: JSON.stringify({
          list: await list, 
          total: await total
        })
      })
    }
  },

  async save(req, res, next) {
    let result = await posModel.save({
      ...req.body,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    // console.log(result)
    if(result) {
      res.render('success', {
        data: JSON.stringify({
          msg: '职位添加成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '职位添加失败.'
        })
      })
    }
  },

  async findone(req, res, next) {
    // console.log(req.body.id)
    let result = await posModel.findone(req.body.id) // 后端从POST请求中拿到id
    if(result) {
      res.render('success', {
        data: JSON.stringify(result)
      })
    }
  },

  async put(req, res, next) {
    let result = await posModel.put({
      ...req.body,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    res.render('success', {
      data: JSON.stringify({
        msg: '数据修改成功.'
      })
    })
  },

  async delete(req, res, next) {
    let result = await posModel.delete(req.body.id)
    res.render('success', {
      data: JSON.stringify({
        msg: '数据删除成功.'
      })
    })
  }
}