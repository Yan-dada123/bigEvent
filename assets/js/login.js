$(function () {
    // 点击事件切换登录注册框
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    let form = layui.form
    //自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            //通过形参拿到的是确认密码框的值
            let pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })


    //注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // let dataStr = $(this).serialize();
        // console.log(dataStr);
        // console.log(111);
        let username = $('#username').val();
        let password = $('#password').val();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            method: 'post',
            data: {
                username: username,
                password: password
            },
            success(res) {
                layui.layer.msg(res.message)
                if (res.status != 0) return;
                //清空注册表单
                $('#form_reg')[0].reset();
                //切换到登录div
                $('#link_login').click();

            }
        })
    })


})

