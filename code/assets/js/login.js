$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 1.对表单进行正则验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 判断两次的密码
        repwd: function (value) {
            var pwd = $('.reg-box[name=password]').val();
            if (pwd !== value) {
                return "两次密码输入不一致，请重新输入！！"
            }
        }
    })

    // 2.注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5})
                }
                layer.msg(res.message, {icon: 6});
            }
        })
    })

    // 3.登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg(res.message, {icon: 5});
                }
                layer.msg(res.message, {icon: 6});
                localStorage.setItem('token',res.token);
                // location.href="/index.html";
            }
        })
    })
})