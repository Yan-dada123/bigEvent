
$(function () {
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能出现空格'],
        samepwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一样'
            }
        },
        confirmpwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '确认密码与新密码输入不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status != 0) return layui.layer.msg(res.message);
                layer.msg(res.message, {
                    icon: 1,
                    time: 1500 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    localStorage.removeItem('token')
                    window.parent.location = '/login.html'
                });


            }
        })
    })


})