
$(function () {
    //分页查询参数对象
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    //加载列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                let htmlStr = template('tpl', res.data)
                $('tbody').html(htmlStr)
                //分页
                renderPage(res.total)
            }
        })
    }
    //事件过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
    // 给时间补零的函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }


    //初始化文章分类
    initCate();
    function initCate() {
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

    //筛选
    $('#form_search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
        initCate()
    })

    //分页
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox',//容器
            count: total,//数据总数
            limit: q.pagesize,//每页显示几条
            curr: q.pagenum,//默认选中
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 5, 10, 20],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()

                }
            }
        })
    }

    //删除
    $('tbody').on('click', '.btn-delete', function () {


        let id = $(this).attr('data-id')
        layer.confirm('您确定要删除这条数据吗', function (index) {
            let rows = $('.btn-delete').length
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    layui.layer.msg(res.message)
                    if (res.status != 0) return;

                    if (rows <= 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum--

                        initTable()

                    }

                }
            })

            layer.close(index)
        })


    })
})