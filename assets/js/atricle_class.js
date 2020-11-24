$(function(){


    getatricle();

    var layer = layui.layer
    let form = layui.form
function getatricle(){
    $.ajax({
       method:"get",
        url: "/my/article/cates",
        success: function (res) {
            const htmlStr = template('tpl',res)
            $('#tb').html(htmlStr)
        }
    });

}
let indexadd = null
$('#btn_add').on('click',function(){
    // console.log('ok');
     indexadd = layer.open({
            type:1,
            area:["500px","250px"],
            title:"添加文章分类",
            content:$('#dialog-add').html()
    })
})

$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
       method:"post",
        url: "/my/article/addcates",
        data: $(this).serialize(),
    
        success: function (res) {
            if(res.status != 0) return layer.msg("添加失败")
         
            getatricle();
            layer.msg('添加成功')
            layer.close(indexadd)
        }
    });

})

    let indexEdit =null
$('tbody').on('click','.btn-edit',function(){
    indexEdit = layer.open({
        type:1,
        area:["500px","250px"],
        title:"编辑",
        content:$('#dialog-edit').html()

        
    })
    
    var id = $(this).attr('data-id')
    //发起请求获取分类数据
    $.ajax({
        method:"get",
        url: '/my/article/cates/' + id,
        success: function (res) {
            form.val('form-edit',res.data)
        }
    });
})

$('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    $.ajax({
        method:"post",
        url: "/my/article/updatecate",
        data: $(this).serialize() ,

        success: function (res) {
           if(res.status !=0 ) return layer.msg('更新数据失败')
            layer.msg('更新成功')
            layer.close(indexEdit)
            getatricle();  
        }
    });



})

$('tbody').on('click','.btn_del',function(){
        var id = $(this).attr('data-id')
        
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method:"get",
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if(res.status!=0) return layer.msg('删除失败')
                    layer.msg('删除成功')
                    layer.close(index)
                    getatricle();
                }
            });
        })




})



})