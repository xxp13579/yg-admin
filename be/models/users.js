const mongoose = require('../utils/db')

const Users = mongoose.model('users', { // 定义一个模型，在数据库中创建了一个集合
  username: String,
  password: String
})

module.exports = {
  // 保存数据到数据库
  save({username, password}) { // 解构 好处，参数顺序可以颠倒随便
    const users = new Users({
      username, // username: username
      password
    })
    return users.save() // save是个Promise，所以可以直接return
  },

  // 查找一条数据
  findOne(username) {
    return Users.findOne({username})
  }
}