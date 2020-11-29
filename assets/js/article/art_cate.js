

$(function () {
    //获取列表数据
    initArtCateList()


    let layerId = null
    $('#btnAddCate').on('click', function () {
        layerId = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tpl_window').html()
        })
    })


    //通过代理的形式为formadd绑定事件
    $('body').on('submit', '#formadd', function (e) {
        e.preventDefault()
        console.log(99);
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                layui.layer.msg(res.message)
                if (res.status != 0) return;
                initArtCateList()
                //关闭弹窗
                layui.layer.close(layerId)
            }
        })
    })


    //编辑按钮
    $('tbody').on('click', '.btn-edit', function () {
        layerId = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#tpl_edit').html()
        })
        let id = $(this).attr("data-id");

        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'get',
            success: function (res) {
                if (res.status != 0) return;
                layui.form.val('formedit', res.data)
            }
        })

    })
    $('body').on('submit', '#formedit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return;
                initArtCateList();
                layui.layer.close(layerId)
            }
        })
    })
    //删除按钮
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        layer.confirm('您确定要删除这条数据吗', function (index) {

            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    layui.layer.msg(res.message)
                    if (res.status != 0) return;
                    initArtCateList()

                }
            })

            layer.close(index)
        })


    })

})

function initArtCateList() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) return layuiAll.layer.msg(res.message)
            let htmlStr = template('tpl', res)
            $('tbody').empty().html(htmlStr)
        }
    })
}