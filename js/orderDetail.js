/*var data = {
    "status": 1,
    "msg": "查询订单信息成功",
    "data": {
        "ordersGoods": [{
            "id": 8955,
            "orderId": 10053,
            "goodsId": 13,
            "goodsName": "醇香奶茶",
            "batteryId": 0,
            "price": 0.01,
            "count": 1,
            "url": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1520935320486.jpg",
            "status": 0,
            "startTime": "2018-05-15 11:29:52",
            "makeCount": 0,
            "discount": 0.0
        }, {
            "id": 8956,
            "orderId": 10053,
            "goodsId": 7,
            "goodsName": "TYPE-C数据线",
            "batteryId": 0,
            "price": 0.01,
            "count": 1,
            "url": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184120266.jpg",
            "status": 0,
            "startTime": "2018-05-15 11:29:52",
            "makeCount": 0,
            "discount": 0.0
        }, {
            "id": 8957,
            "orderId": 10053,
            "goodsId": 6,
            "goodsName": "苹果数据线",
            "batteryId": 0,
            "price": 0.01,
            "count": 1,
            "url": "http://jiegui.oss-cn-shenzhen.aliyuncs.com/GoodsImage/1514184026047.jpg",
            "status": 0,
            "makeCount": 0,
            "startTime": "2018-05-15 11:29:52",
            "discount": 0.0
        }],
        "orders": {
            "orderId": 10053,
            "orderType": 1,
            "orderNumber": "201805151129511965",
            "status": 0,
            "userId": 854,
            "nikeName": null,
            "total": 0.03,
            "deviceId": 10,
            "deviceNumber": "867184038541128",
            "prepayId": "wx151129522534821d9f37f4941570932668",
            "discount": 0.0,
            "getScore": 0,
            "useScore": 0
        },
        "type": 1
    },
    "code": 0
}*/
$(function(){
    window.onpageshow = function(event){
        if (event.persisted) {
            window.location.reload();
        }
    };

    getUserOrderDetail();
   /* back();*/
})
//获取用户信息
function getUserOrderDetail(){
    $.ajax({
        type:'POST',
        url:host+'weixin/order/orderGoods',
        data:{
            //orderId:sessionStorage.orderId
            orderId:'10136'
        },
        success:function(data){
            console.log(data)
            if(data.status == 1){
                dataHandle( data )
            }else{
                alert(data.msg)
            }
        },
        error:function(data){
            alert(data.msg)
        }
    })
}

//用户订单数据处理
function dataHandle( data ){
//订单金额
    $('.total').children().text(data.data.total)
    //$(".discount").text('￥ '+data.data.discount);

    //支付信息
    $.each( data.data.ordersGoodsDetails,function (index, item) {
        var ordersGoods = '<ul>' +
            '<li class="orderDetail_img">' +
                '<img src="img/orange_juice.jpg" alt="">' +
            '</li>' +
            '<li class="orderDetail_details">' +
            '<p class="orderDetail_pirce">￥'+item.price+'</p>' +
            '<div class="orderDetail_title">' +
            '<span class="orderDetail_type">'+item.goodsName+'</span>' +
            '<span class="orderDetail_count">X'+item.count+'</span>' +
            '<span class="orderDetail_number">(2/5)</span>' +
            '</div>' +
            /*'<p class="orderDetail_time">'+time+'</p>' +*/
            '</li>' +
            '<li class="orderDetail_state">正在制作中</li>' +
            '</ul>';
        $('.orderDetail_con').append(ordersGoods)
    })

    $.each( data.data.goodsUpdate,function (index, item) {
        var time = '<p class="orderDetail_time">'+item.updateTime+'</p>'
        $('.orderDetail_details').append(time)
    })
}
$(function(){
//获取订单信息
    /*function getOrder(){
        console.log(data)
        if(data.status == 1){
            $.each(data.data.ordersGoods,function(index,item){
                var order = '<ul>' +
                    '<li class="orderDetail_img">' +
                    '<img src="'+item.url+'" alt="">' +
                    '</li>' +
                    '<li class="orderDetail_details">' +
                    '<p class="orderDetail_pirce">￥'+item.price+'</p>' +
                    '<p class="orderDetail_title">'+item.goodsName+'</p>' +
                    '<p class="orderDetail_time">'+item.startTime+'</p>' +
                    '<p class="orderDetail_count">数量：'+item.count+'</p>' +
                    '</li>' +
                    '</ul>'
                $('.orderDetail_con').append(order)
            })

        }else{
            alert(data.msg)
        }
        //总价
        $('.total_price').children('span').text( data.data.orders.total*1 )

    }*/
    //getOrder()
})