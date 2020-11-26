$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url
    //统一为有权限的接口，设置headers
    if (option.url.indexOf('/my/') > -1) {
        option.headers = { Authorization: localStorage.getItem('token') }
    }

    //全局统一complete回调函数
    option.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {

            layer.msg(res.responseJSON.message, {
                icon: 1,
                time: 1500
            }, function () {
                localStorage.removeItem('token');
                window.top.location.href = '/login.html'
            })



        }
    }
})