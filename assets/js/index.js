
$(function () {
    getUserInfo()


    $('#btnlogout').on('click', function () {
        // console.log(1);
        layer.confirm('确定要退出吗?', { icon: 3, title: '系统提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        })
    })

})
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success(res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            //渲染用户头像
            renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html(name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').text(first).show()
    }

}