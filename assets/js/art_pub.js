$(function(){

var layer = layui.layer
var form = layui.form
initCate()
initEditor()
function initCate(){
$.ajax({
    type: "get",
    url: "/my/article/cates",
    success: function (res) {
            if(res.status  != 0 ) return layer.msg('获取请求失败')

            var htmlStr = template('tpl',res)
            $('select').html(htmlStr)
            form.render()
        }
});


}
  // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)

  $('#btn_choose').on('click',function(){

    $('#coverFile').click()

  })

  $('#coverFile').on('change',function(e){ 
    var files = e.target.files
    if(files.length===0) return 
    var newImgURL = URL.createObjectURL(files[0])
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

  })
  //定义文章的已发布状态
  var art_state = '已发布'
  //为存为草稿绑定点击事件
  $('#caogao').on('click',function(){
      art_state = '草稿'
  })

  //为表单绑定submit提交事件
  $('#form_pub').on('submit',function(e){
    e.preventDefault()
    //基于form表单  快速创建一个formData  对象
    var fd = new FormData($(this)[0])
    // 将文章的发布状态 存到fd中
    fd.append('state',art_state)

    //将封面裁剪过后的图片输出为一个文件对象
    $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作

    //将文件对象存储到fd中
    fd.append('cover_img',blob)

    //发起ajax请求  

    pushAtricle(fd)

})
  })

  function pushAtricle(fd){
    $.ajax({
        method:'post',
        url: "/my/article/add",
        data: fd,
        //注意 : 如果向服务器提交的是FormData格式的数据,必须添加以下两个配置项
        contentType:false,
        processData:false,
     
        success: function (res) {
            if(res.status !=0) return layer.msg('发布文章失败')
            layer.msg('发布文章成功')
            location.href="/article/art_list.html"
        }
    });


  }



})