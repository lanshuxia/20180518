$(function(){
    window.onpageshow = function(event){
        if (event.persisted) {
            window.location.reload();
        }
    };

    getOrder();
})

//获取订单信息
function getOrder(){
    $.ajax({
        type:'POST',
        url:host+'weixin/user/toOrderInfo',
        data:{
            //orderId:sessionStorage.orderId
            orderId:'10136'
        },
        success:function(data){
            console.log(data)
            if(data.status == 1){
                var time = data.data.orders.startTime;
                $.each(data.data.ordersGoods,function(index,item){
                    var order = '<ul>' +
                        '<li class="goodList_img">' +
                        '<img src="img/orange_juice.jpg" alt="">' +
                        '</li>' +
                        '<li class="goodList_details">' +
                        '<p class="goodList_pirce">￥'+item.price+'</p>' +
                        '<div>' +
                        '<p class="goodList_title">'+item.goodsName+'</p>' +
                        '<p class="goodList_count">X'+item.count+'</p>' +
                        '</div>' +
                        '<p class="goodList_time">'+time+'</p>' +
                        '</li>' +
                        '</ul>'
                    $('.goodList_con').append(order)
                })

            }else{
                alert(data.msg)
            }
            //总价
            $('.total_price').children('span').text( data.data.orders.total*1 )
            pay(data.data.orders.prepayId);
        },
        error:function(){
            alert('服务器错误')
        }
    })
    //console.log(data)
}
function pay(prepayid){
    $('.goodList_btn').click(function(){
        var prepay_id = prepayid;
        wxpay(prepay_id);
    })
}
