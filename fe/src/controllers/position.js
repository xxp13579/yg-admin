import positionView from '../views/position-list.art'
import positionAddView from '../views/position-add.art'
import positionEditView from '../views/position-edit.art'
import _ from 'lodash'

const COUNT = 5

function remove(id, res) {
  $.ajax({
    url: '/api/position/delete',
    type: "DELETE",
    data: {
      id
    },
    success(result) {
      if (result.ret) {
        res.go('/position?_=' + Date.now())
      }
    }
  })
}

function loadData(res, pageNo) {
  let start = pageNo * COUNT
  $.ajax({
    url: '/api/position/list',
    data: {
      start,
      count: COUNT
    },
    success(result) {
      if (result.ret) {
        // console.log(_.range(Math.ceil(result.data.total / COUNT)))
        // let {list, total} = result.data
        // res.render(positionView({
        //   list,
        //   total
        // }))
        res.render(positionView({
          ...result.data,
          pageNo,
          pageCount: _.range(Math.ceil(result.data.total / COUNT))
        }))
      } else {
        res.go('/')
      }
    }
  })
}

export default {
  render(req, res) {
    loadData(res, 0)
    $('#router-view').on('click', '#addbtn', () => {
      res.go('/position_add') // res就是路由实例，所以可以直接使用res.go
    })
    $('#router-view').on('click', '.btn-update', function() {
      res.go('/position_edit', {
        id: $(this).attr('data-id') // 将id通过body传递给下一个路由
      }) 
    })
    $('#router-view').on('click', '.btn-delete', function() {
      remove($(this).attr('data-id'), res)            
    })
    $('#router-view').on('click', '#page li[data-index]', function(){
      // console.log($(this).attr('data-index'))
      loadData(res, $(this).attr('data-index'))
    })
  },

  add(req, res) {
    res.render(positionAddView({}))
    $('#posback').on('click', () => {
      res.back()
    })

    $('#possubmit').on('click', () => {
      let data = $('#possave').serialize()
      $.ajax({
        url: '/api/position/save',
        type: 'POST',
        data,
        success(result) {
          // console.log(result)
          if(result.ret) {
            res.back()
          }else{
            alert(result.data.msg)
          }
        }
      })
    })
  },

  edit(req, res) {
    $.ajax({
      url: '/api/position/findone',
      type: 'POST',
      data: {
        id: req.body.id // 接收上一个路由通过body传递过来的数据
      },
      success(result) {
        // console.log(result)
        res.render(positionEditView(result.data))
        $('#posback').on('click', () => {
          res.back()
        })
        $('#possubmit').on('click', () => {
          let data = $('#posedit').serialize() // 这不是json，这是一段a=1&b=1...的字符串
          $.ajax({
            url: '/api/position/put',
            type: 'PUT',
            data: data + '&id=' + req.body.id,
            success(result) {
              // console.log(result)
              if(result.ret) {
                res.back()
              }else{
                alert(result.data.msg)
              }
            }
          })
        })
      }
      
    })
    res.render(positionEditView({})) // 渲染页面之前用ajax获取数据
    // console.log(req)
    // console.log(req.body)
    // console.log(req.body.id)
  }
}