var baseURL = "http://ajax.frontend.itheima.net";
$.ajaxPrefilter(function (params) {
    // console.log(params.url);
    params.url = baseURL + params.url;

    // 2.对有权限的接口配置头信息
    if (params.url.indexOf("/my/") !== -1){
        params.headers={
            Authorization:localStorage.getItem('token')||""
        }
    }
    params.complete=function(res){
        // console.log(res.responseJSON);
        if(res.responseJSON.status==1&&res.responseJSON.message=="身份认证失败！"){
            location.href="/login.html";
            localStorage.removeItem("token");
        }
    }
})