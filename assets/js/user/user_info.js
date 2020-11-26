$(function () {
    let form = layui.form
    form.verify({
        nickname: [/^\S{6,12}$/, '昵称必须在6-12个字符之间']
    })
    // 加载用户基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) return layui.layer.msg(res.message)
                form.val('formUserInfo', res.data)

            }
        })
    }

    //重置用户信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                layui.layer.msg(res.message)
                if (res.status != 0) return;

                //通过window.parent调用父页面的方法
                window.parent.getUserInfo()
            }
        })
    })

})