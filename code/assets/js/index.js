$(function () {
    getUserInfo();
    var layer=layui.layer;
    $('#btnLogout').on('click',function(){
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token")
            location.href="/login.html";
            layer.close(index);
          });
    })

});
// 1.渲染用户名
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem("token")

        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message, {icon: 5});
            }
            //请求成功，渲染头像
            renderAvatar(res.data);
        }
    })
}
// 2.渲染头像
function renderAvatar(user){
    // 1.渲染名称
    var name =user.nickname||user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;"+name);
    if(user.user_pic!==null){
        $('.layui-nav-img').attr("src",user.user_pic).show();
        $('.test-avatar').hide();
    }else{
        // 没有头像
        $('.layui-nav-img').hide();
        var text=name[0].toUpperCase();
        $('.test-avatar').html(text).show();
    }
}