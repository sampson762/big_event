$.ajaxPrefilter(function(opt){
    opt.url = "http://ajax.frontend.itheima.net" + opt.url


    if (opt.url.indexOf('/my/') !== -1) {
        opt.headers = {
          Authorization: localStorage.getItem('token') || ''
        }
      }

     opt.complete = function(res){
       if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        
            localStorage.removeItem('token')
        
            location.href='/login.html'
        }
    }

})