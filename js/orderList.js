$(function(){
    window.onpageshow = function(event){
        if (event.persisted) {
            window.location.reload();
        }
    };
    getUserOrder()
    orderDdetail()
})
//获取用户订单
function getUserOrder(){
    $.ajax({
        type:'POST',
        url:host+'weixin/order/selectUserOrder',
        data:{
            //userId:sessionStorage.userId
            userId:'854'
        },
        success:function(data){
            console.log(data)
            if(data.status ==1){
                dataHandle(data)
            }else{
                alert(data.msg)
            }
        },
        erron:function(data){
            alert('服务器错误')
        }
    })
}
//用户订单数据处理
function dataHandle(data){
    //console.log(data)
    if(data.data.orderList.length == 0 ){ //暂无订单
        var No_order = '<div class="no_order"><img src="./img/logo.png" alt=""><p>您的订单暂时为空！</p></div>'
        $('.orderList').append(No_order);
    }else{
        $.each(data.data.orderList,function(index,item){
            //状态颜色
            var state = item.stats;
            var stateColor = "";
            if(state == '待支付' || state == '完成'){
                stateColor = '<li class="list_stats" style="color:#eb181c">'+state+'</li>'
            }else{
                stateColor = '<li class="list_stats" style="color:#000;">'+state+'</li>'
            }
            //状态图标
            var stateType = item.orderType;
            var stateIcon = '';
            if(stateType.substr(0,2) == '商品'){
                stateIcon = '<img src="img/orderList_01.png" alt="">'
            }else if(stateType.substr(0,2) == '数据'){
                stateIcon = '<img src="img/orderList_03.png" alt="">'
            }else if(stateType.substr(0,2) == '照片'){
                stateIcon = '<img src="img/orderList_02.png" alt="">'
            }else{
                stateIcon = '<img src="img/orderList_04.png" alt="">'
            }

            var orderList = '<a href="javascript:;" orderId="'+item.orderId+'" class="orderList_item">'+'<div class="orderList_con">' +
                '<div class="orderList_left">' +
                stateIcon +
                '</div>' +
                '<ul class="orderList_right">' +
                '<li class="list_type">' +
                '<p class="list_type_type">'+item.orderType+'</p>' +
                '<p class="list_type_time">'+item.startTime+'</p>' +
                '</li>' +
                '<li class="list_price">￥'+item.total+'</li>' +
                stateColor +
                '</ul>' +
                '</div>'+'</a>'
            $('.orderList').append(orderList);
        })
    }
}

//用户订单详情
function orderDdetail(){
     $('.orderList').delegate('.orderList_item','click',function(){
         sessionStorage.orderId = $(this).attr('orderid');
         window.location.href = '../orderDetail.html'
     })
}

