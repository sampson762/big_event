$(function(){

    $('#link_login').on('click',function(){
        $('.login_bd').hide()        
        $('.reg_bd').show()


    })
    $('#link_reg').on('click',function(){
        $('.login_bd').show()        
        $('.reg_bd').hide()
    })

    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            var pwd = $('.reg_bd [name=pwd]').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    })


    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data =  {username:$('.reg_bd [name=username]').val(),password:$('.reg_bd [name=pwd]').val()}
       $.post("/api/reguser", 
           data,
            function (res) {
                if(res.status !== 0) return layer.msg(res.message);
                console.log(res);
          
                layer.msg('注册成功', {
                    time: 1500
                  },function(){
                    $('#link_reg').click();
                    $('#form_reg')[0].reset()
                  })
            }  
        );
    })

    $('#form_login').on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log($('#form_login').serialize());
                console.log(res.status);
                    if(res.status !== 0) return  layer.msg('登录失败')
                    layer.msg('登录成功')
                    $('#form_login')[0].reset()
                    // console.log(res.token);
                    localStorage.setItem('token',res.token)
                    location.href = '/index.html'
                    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM2NTYsInVzZXJuYW1lIjoibGtqaDEyMyIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjA1ODcxNDg2LCJleHAiOjE2MDU5MDc0ODZ9.NA1148i9fKUJubKWwWRjArs68VPpPKa9IP_uS6ScquM
                }
        });

    })





})