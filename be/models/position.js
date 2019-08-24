const mongoose = require('../utils/db')

const Model = mongoose.model('positions', { // 定义一个模型，在数据库中创建了一个集合
  companyName: String,
  positionName: String,
  city: String,
  salary: String,
  createTime: String
})

module.exports = {
  find({start, count}) {
    return {
      list: Model.find({}).sort({_id: -1}).limit(~~count).skip(~~start),
      total: Model.count({})
    }
  },

  findone(id) {
    return Model.findById(id)
  },

  save(data) {
    let model = new Model(data) // 只有添加才new
    return model.save()
  },

  put(data) {
    return Model.updateOne({_id: data.id}, data) // 第一个参数条件，第二个参数修改成的内容
  },

  delete(id) {
    return Model.deleteOne({_id: id})
  }
}