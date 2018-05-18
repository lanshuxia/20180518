
$(function(){
    window.onpageshow = function(event){
        if (event.persisted) {
            window.location.reload();
        }
    };

    getUserWallet();
})
//获取用户钱包数据
function getUserWallet(){
    $.ajax({
        tyle:'POST',
        url:host+'weixin/wallet',
        data:{
            userId:'854'
        },
        success:function(data){
            console.log(data)
            if(data.status == 1){
                dataHandle(data)
            }else{
                alert(data.msg)
            }
        },
        error:function(){
            alert('服务器错误')
        }
    })
}
//用户订单数据处理
function dataHandle(data){
    if(data.data.wallets.length == 0){ //暂无订单
        var No_order = '<div class="no_order"><img src="./img/logo.png" alt=""><p>您的交易记录暂时为空！</p></div>'
        $('.orderList').append(No_order);

    }else{
        $.each(data.data.wallets,function(index,item){
           /* //状态图标
            var stateType = item.orderType;
            var stateIcon = '';
            if(stateType.substr(0,2) == '饮品'){
                stateIcon = '<img src="img/orderList_01.png" alt="">'
            }else if(stateType.substr(0,2) == '数据'){
                stateIcon = '<img src="img/orderList_03.png" alt="">'
            }else if(stateType.substr(0,2) == '照片'){
                stateIcon = '<img src="img/orderList_02.png" alt="">'
            }else{
                stateIcon = '<img src="img/orderList_04.png" alt="">'
            }*/
            var itemMoney = ''
            if(item.type == 8){
                itemMoney = '<li class="list_price" style="color:#eb181c">+￥'+item.money+'</li>'
            }else{
                itemMoney = '<li class="list_price">-￥'+item.money+'</li>'
            }

            var orderList = '<a href="javascript:;" orderid="'+item.orderId+'">'+'<div class="orderList_con">' +
                '<div class="orderList_left">' +
                '<img src="img/orderList_01.png" alt="">' +
                '</div>' +
                '<ul class="orderList_right">' +
                '<li class="list_type">' +
                '<p class="list_type_type">饮品</p>' +
                '<p class="list_type_time">'+item.time+'</p>' +
                '</li>' +
                itemMoney+
                '</ul>' +
                '</div>'+'</a>'
            $('.orderList').append(orderList);
        })
    }
}