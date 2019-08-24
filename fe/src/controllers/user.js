import userView from '../views/user.art'

let _url = ''
let _type = ''
let _sideUsername = $('#side-username')

export default {
  async render(){
    // 开始先ajax请求判断是否有权限
    let result = await this.isSignin()

    // userView是loader返回的函数
    // 此函数可以用于直接返回字符串（userView(data)）
    let html = userView({
      isSignin: result.ret,
      username: result.data.username
    })
    $('#user-menu').html(html)
    this.bindEvent()
  },

  isSignin() {
    return $.ajax({
      url: '/api/users/isSignin',
      dataType: 'json',
      success(result) {
        // console.log(result)
        if(result.ret) {
          _sideUsername.html(result.data.username)
        } else {
          _sideUsername.html('请登录')
        }
        return result
      }
    }) 
  },

  bindEvent() {
    $('#user-menu span').on('click', function() {
      _type = $(this).attr('id')
      _url = _type === 'btn-signin' ? '/api/users/signin' : '/api/users/signup'
      $('#user-form input').val('')
    })

    $('#btn-submit').on('click', () => {
      let data = $('#user-form').serialize() // 序列表表格内容为字符串
      // console.log(data)
      $.ajax({
        url: _url,
        type: 'POST',
        data,
        success: this.bindEventSuc,
        // this.bindEventSuc.bind(this, result) 会报错，因为没有定义result，但是这个函数是success的回调函数，，能拿到result
        error: this.bindEventErr
      })
    })

    $('#btn-signout').on('click', () => {
      $.ajax({
        url: '/api/users/signout',
        success: this.bindEventSuc,
        error: this.bindEventErr
      })
    })
  },

  bindEventErr(){

  },

  bindEventSuc(result){ 
    // console.log(result)
    if (_type === 'btn-signin') {
      if (result.ret) {
        let html = userView({
          isSignin: true,
          username: result.data.username
        })
        // console.log(result)
        $('.user-menu').html(html)
        $('#btn-signout').on('click', () => {
          $.ajax({
            url: '/api/users/signout',
            success: () => {
              this.bindEventSuc
              location.reload()
            },
            error: this.bindEventErr
          })
        })
        _sideUsername.html(result.data.username)
        // console.log(_sideUsername)
      } else {
        alert(result.data.msg)
      }
    } else if (_type === 'btn-signup') {
      if (result.ret) {
        alert('注册成功，可以登录了')
      } else {
        alert(result.data.msg)
      }
    } else {
      location.reload()
    }
  }
}