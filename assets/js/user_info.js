$(function(){

const form = layui.form
const layer = layui.layer
form.verify({
    nickname:function(value){
        if(value.length > 6) {
            return "昵称长度必须在1~6个字符之间"
        }
    }
})
inituserinfo()

    function inituserinfo(){
        $.ajax({
            method:"GET",
            url: "/my/userinfo",
    
            success: function (res) {
                if(res.status != 0) return layer.msg('获取信息失败')
                // layer.msg('获取信息成功')
                form.val('formUser', res.data);
            }
        });
    }

$('#but_result').on('click',function(e){
    //阻止表单的默认重置行为
    e.preventDefault()
    inituserinfo()

})

$('.layui-form').on('submit',function(e){
    e.preventDefault();
  
    $.ajax({
        method:"POST",
        url: "/my/userinfo",
        data: $(this).serialize(),
        success: function (res) {
            if(res.status != 0) return layer.msg('更新用户信息失败')
            layer.msg('更新用户信息成功')
            window.parent.userinfo();
        }
    });


})


})