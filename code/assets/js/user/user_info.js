$(function () {
    // 1.自定义校验规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度1-6之间"
            }
        }
    })

    // 2.用户渲染,为了在表单重置的时候使用
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                form.val('formUserInfo', res.data);

            }
        })
    }

    // 3.表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 4.修改用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("修改成功！")
                window.parent.getUserInfo();
            }
        })
    })



})