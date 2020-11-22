$(function(){



    userinfo();
  
   
    var layer = layui.layer
    $('#close_btn').on('click',function(){
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href= '/login.html'
            layer.close(index);
          });


    })

})

  function userinfo(){
    
    $.ajax({
        method:"GET",
        url: "/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if(res.status !== 0 ) return layui.layer.msg('获取用户信息失败')
            avater(res.data);
        },
    
     
    });


  }

  function avater(user) {

    var name = user.nickname|| user.username 
    
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)

    if(user.user_pic !== null) {
          $('.text-avater').hide()
          $('.layui-nav-img').attr('src',user.user_pic).show()

    }else {
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
        $('.layui-nav-img').hide()
    }
    // $('.text-avater').html('name[0].toUpperCase')     


  }