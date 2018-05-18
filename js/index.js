/*var data = {
    "status": 1,
    "msg": "信息获取成功",
    "data": {
        "fgs": [{
            "goodsId": 6,
            "price": 0.01,
            "count": 0,
            "id": 4,
            "goodsName": "苹果数据线",
            "url": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184026047.jpg"
        }, {
            "goodsId": 7,
            "price": 0.01,
            "count": 0,
            "id": 5,
            "goodsName": "TYPE-C数据线",
            "url": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184120266.jpg"
        }, {
            "goodsId": 8,
            "price": 0.01,
            "count": 0,
            "id": 6,
            "goodsName": "安卓数据线",
            "url": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184281995.jpg"
        }],
        "imgPrice": 1.0,
        "batterySets": [{
            "unit": "",
            "money": 0.05,
            "name": "押金"
        }, {
            "unit": "每小时",
            "money": 0.01,
            "name": "租金"
        }],
        "deposit": 0.05,
        "goods": [{
            "hotSell": "yes",
            "goodsId": 13,
            "price": 0.01,
            "goodsName": "醇香奶茶",
            "sales": 37,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1520935320486.jpg"
        }, {
            "hotSell": "yes",
            "goodsId": 12,
            "price": 0.01,
            "goodsName": "永和豆浆",
            "sales": 16,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514257801599.jpg"
        }, {
            "hotSell": "yes",
            "goodsId": 11,
            "price": 0.01,
            "goodsName": "炭烧咖啡",
            "sales": 12,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1520942758337.jpg"
        }, {
            "hotSell": "yes",
            "goodsId": 10,
            "price": 0.01,
            "goodsName": "纯净水",
            "sales": 11,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1520935330317.jpg"
        }, {
            "hotSell": "yes",
            "goodsId": 5,
            "price": 0.01,
            "goodsName": "纸巾",
            "sales": 30,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1520860632295.jpg"
        }, {
            "hotSell": "yes",
            "goodsId": 8,
            "price": 0.01,
            "goodsName": "安卓数据线",
            "sales": 6,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184281995.jpg"
        }, {
            "hotSell": "yes",
            "goodsId": 7,
            "price": 0.01,
            "goodsName": "TYPE-C数据线",
            "sales": 6,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184120266.jpg"
        }, {
            "hotSell": "yes",
            "goodsId": 6,
            "price": 0.01,
            "goodsName": "苹果数据线",
            "sales": 5,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184026047.jpg"
        }, {
            "hotSell": "no",
            "goodsId": 9,
            "price": 0.01,
            "goodsName": "冰淇淋",
            "sales": 0,
            "thumbnailUrl": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514257642337.jpg"
        }],
        "deviceSetting": null,
        "deviceNumber": "867184038541128",
        "userId": 857
    },
    "code": 0
}*/
$(function() {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    getIndexData(getUrlParams('deviceNumber'), getUrlParams('code'), getUrlParams('state'));

    increment();

    decrement();
    /*
     bottomAdaptation();
     bottomAdaptation();

     addPic();

     goodsCommit();

     batteryCommit();

     imgCommit();

     maxMap();

     back();*/
})
//=====================================================首页数据请求处理==========================
    function getIndexData(deviceN, codeN, stateN) {
        var sendData = {};
        sendData.deviceNumber = deviceN;
        sendData.code = codeN;
        sendData.state = stateN;
        console.log("设备编号" + deviceN + "\n;code" + codeN + "\stateN" + stateN);

        $.ajax({
            type: 'GET',
            url: host + 'weixin/user/index1?deviceNumber=867184038541128',
            cache: true,
            success: function (data) {
                console.log(data)
                if (data.status == 1) {//信息获取成功
                    commodityCollection(data.data)
                    //console.log(data.data.deviceSetting);
                    if (data.data.deviceSetting && data.data.deviceSetting.isBatteryFunction == 1) {
                        notBattery();
                    }
                } else {
                    alert(data.msg);
                }
            },
            error: function (data) {
                alert("服务请求失败");
            }
        })
    }

    //商品合集
    function commodityCollection(data) {
        //goods商品列表
        data.goods.drink.forEach(function (item) {
            var list = '<li>' +
                '<img src="img/coffee.jpg" alt="">' +
                '<p class="products_list_tip">' + item.goodsName + '</p>' +
                '<div>' +
                '<span>￥</span>' +
                '<span class="price">' + item.price + '</span>' +
                '<span class="computer">' +
                '<span class="decrement"><img src="img/minus.png" alt=""></span>' +
                '<input type="number" class="number" value="0">' +
                '<span class="increment"><img src="img/add_01.png" alt=""></span>' +
                '</span>' +
                '</div>' +
                '</li>'
            $('#products_list').append(list);
        })
        //数据线列表
        data.goods.dataCable.forEach(function (item) {
            var list = '<li>' +
                '<img src="img/line.png" alt="">' +
                '<p class="products_list_tip">' + item.goodsName + '</p>' +
                '<div>' +
                '<span>￥</span>' +
                '<span class="price">' + item.price + '</span>' +
                '<span class="computer">' +
                '<span class="decrement"><img src="img/minus.png" alt=""></span>' +
                '<input type="number" class="number" value="0">' +
                '<span class="increment"><img src="img/add_01.png" alt="" id="img_add"></span>' +
                '</span>' +
                '</div>' +
                '</li>'
            $('#data_line').append(list);
        })
        //纸巾
        data.goods.tissue.forEach(function (item) {
            var list = '<li>' +
                '<img src="img/line.png" alt="">' +
                '<p class="products_list_tip">' + item.goodsName + '</p>' +
                '<div>' +
                '<span>￥</span>' +
                '<span class="price">' + item.price + '</span>' +
                '<span class="computer">' +
                '<span class="decrement"><img src="img/minus.png" alt=""></span>' +
                '<input type="number" class="number" value="0">' +
                '<span class="increment"><img src="img/add_01.png" alt="" id="img_add"></span>' +
                '</span>' +
                '</div>' +
                '</li>'
            $('#tissue_con').append(list);
        })
    }

    //商品-增加数量
    function increment() {
        $('.decrement').hide();
        $('.list_con').delegate(".increment", "click", function () {
            clearTimeout(timer1);
            $(this).children().attr('src', 'img/add_02.png');
            $(this).parent('.computer').find('.number').show();
            $(this).parent('.computer').find('.decrement').show();
            $('.footer_con').show();
            $('.cart_icon_number').children().remove(); //购物车数量清0
            var count = 4;
            if ($(this).parent('.computer').children('input').val() >= count) {
                alert(1)
                /*layer.msg("已达到购买最高量",{
                 icon:5,
                 time:1000
                 });*/
            } else {
                $(this).parent('.computer').children('input').val($(this).parent('.computer').children('input').val() * 1 + 1)
                //总数量
                $('.cart_icon').find('.cart_icon_number').text($('.cart_icon').find('.cart_icon_number').text() * 1 + 1)

                var timer1 = setTimeout(function () {
                    $('.cart_icon_number span').children().remove();
                }, 1000)

                //总价格
                var nowPrice = $(this).parents('div').children('.price').text() * 1;
                console.log(nowPrice)
                $('.cart_title_con_price').children('span').text(($('.cart_title_con_price').children('span').text() * 1 + nowPrice).toFixed(2))
            }
        })
    };

    //商品-减少数量
    function decrement() {
        $('.list_con').delegate(".decrement", "click", function () {
            clearTimeout(timer2);
            $('#tab1 .total_mount span').children().remove();
            if ($(this).parent('.computer').children('input').val() < 1) {
                alert(1)
                $(this).parent('.computer').children('input').val(0);
                ($(this).parent('.computer').children('input') ).css('display', 'none');
                ($(this).parent('.computer').children('.increment').find('img') ).attr('src', 'img/add_01.png');
                $(this).hide();
                $('.footer_con').hide();
            } else {
                $(this).parent('.computer').children('input').val($(this).parent('.computer').children('input').val() * 1 - 1)
                //总数量
                $('.cart_icon').find('.cart_icon_number').text($('.cart_icon').find('.cart_icon_number').text() * 1 - 1)

                /*                $('#tab1 .total_mount span').append( $('<span></span>').text('-1').css({
                 color:'red'
                 }).attr('class','fadeOutRight animated') );*/

                var timer2 = setTimeout(function () {
                    $('.cart_icon_number span').children().remove();
                }, 1000)

                //总价格
                var nowPrice = $(this).parents('div').children('.price').text() * 1;
                $('.cart_title_con_price').children('span').text(($('.cart_title_con_price').children('span').text() * 1 - nowPrice).toFixed(2))

            }
        })
    }

