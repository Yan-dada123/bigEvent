$(function () {
    //生成下拉框
    initCateList();
    function initCateList() {

        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                let htmlStr = template('tpl_cate', res)

                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })

    }

    // 富文本
    initEditor()



    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    //监听文件框change事件
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    let state = '已发布'
    //草稿
    $('#btnSave2').on('click', function () {
        state = '草稿'
    })
    //发布
    $('#btnSave1').on('click', function () {
        state = '已发布'
    })

    $('#form_pub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                $.ajax({
                    url: '/my/article/add',
                    method: 'post',
                    data: fd,
                    processDate: false,
                    contentType: false,
                    success: function (res) {
                        console.log(res.data);
                        layer.msg(res.message)
                        if (res.status != 0) return;

                    }
                })
                fd.forEach((e, i) => {
                    console.log(e + i);
                })
            })

        // $.ajax({
        //     url: '/my/article/add',
        //     method: 'post',
        //     data: fd,
        //     success: function (res) {
        //         layer.msg(res.message)
        //         if (res.status != 0) return;

        //     }
        // })
    })
})