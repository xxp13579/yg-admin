module.exports = {
  auth(req, res, next) { // 验证权限
    res.set('content-type', 'application/json;charset=utf-8') // 定义返回的字符串为json字符串
    let username = req.session.username
    if (username) {
      next()
    } else {
      res.render('fail', {
        data: JSON.stringify({
          msg: '用户没有权限',
        })
      })
    }
  }
}