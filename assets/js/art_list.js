$(function(){
    function padZero(n) {
        if (n < 10) {
          return '0' + n
        } else {
          return n
        }
      }
      
        template.defaults.imports.dateFormat =function (dtStr){
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var h = padZero(dt.getHours())
        var min = padZero(dt.getMinutes())
        return y + "-" + m + "-" + d + "   " + h +":" +min
  }
 


    var laypage = layui.laypage;
    var form = layui.form
    var layer = layui.layer

    //定义一个查询的参数对象  将来请求数据时
    //需要将请求参数对象提交到服务器
    let q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    
    
    initTable()
    initCates()
//获取文章列表数据的方法
function initTable(){
$.ajax({
    method: "get",
    url: "/my/article/list",
    data: q,
    success: function (res) {
      
        if(res.status !== 0) return layer.msg('获取文章列表失败')
        layer.msg('获取文章列表成功')
         //使用模板引擎渲染页面数据
      
         var Str = template('tpl',res)
         $('#tb').html(Str)
         //渲染分页
        renderPage(res.total)
    }
   
});
}

function initCates(){
    $.ajax({
       method:'get',
        url: "/my/article/cates",
        success: function (res) {
            if(res.status != 0) return layer.msg('获取文章分类失败')
            var str = template('tpl_class',res)
            $('#cate').html(str)
            //通知layui 重新渲染表单区域的ui结构
            form.render()
        }
    });
}

    $('#form-search').on('submit',function(e){
        e.preventDefault()
     
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })


    function renderPage(total){

        laypage.render({
            elem: 'pagebox' //分页器容器id   不用加 # 号
            ,count: total, //数据总数，从服务端得到
            limit:q. pagesize,
            curr:q.pagenum , //设置默认选择的页
            layout:['count','limit','prev','page','next','skip'],
                // 触发jump 回调的方式有两种
                // 1.点击页码时  会
                //2.只要调用了laypage.render的方法就会触发
            jump:function(obj,first){
                //可以通过first的值判断是哪种方式触发的jump
                //如果first的值为true 证明是2触发的 jump回调
                // 否则是方式1触发的

                //把最新的页码值 赋值到q这个查询参数对象中
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //根据最新的q 获取对应的数据列表 并渲染表格
                //initTable()
                    if(!first){
                        initTable()
                    }
            }
        });


    }


})