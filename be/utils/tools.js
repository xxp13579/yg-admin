const bcrypt = require('bcrypt')

module.exports = {
  // 加密
  crypt(myPlaintextPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
          resolve(hash)
        })
      })
    })
  },

  // 比较
  compare(myPlaintextPassword, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
        // console.log(res)
        resolve(res)
      })
    })
  }
}