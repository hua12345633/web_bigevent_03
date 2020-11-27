$(function () {
    // 1.自定义表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return "新密码与旧密码不能相同"
            }
        },
        repwd: function (value) {
            if (value !== $('[name=pwd]').val()) {
                return "两次密码输入不一致，请重新输入"
            }
        },

    })
    // 2.修改密码
    $('#formUserPwd').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("修改密码成功");
            }
        })
    })
    // 3.修改密码
})