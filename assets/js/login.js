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
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();
        $.ajax({
            url: '/api/reguser',
            method: 'post',
            data: {
                username: username,
                password: password
            },
            success(res) {
                layui.layer.msg(res.message)
                if (res.status != 0) return;

                //将信息填充到登录表单框里
                $('.login-box [name=username]').val(username);
                $('.login-box [name=password]').val(password)
                //清空注册表单
                $('#form_reg')[0].reset();
                //切换到登录div
                $('#link_login').click();

            }
        })
    })

    //登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).serialize());

        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status != 0) return layui.layer.msg(res.message);
                layui.layer.msg(res.message, {
                    icon: 6,
                    time: 1500
                },
                    function () {
                        localStorage.setItem('token', res.token);
                        location.href = '/index.html'
                    }
                )

            }
        })
    })



})

