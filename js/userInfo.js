
$(function(){
    window.onpageshow = function(event){
        if (event.persisted) {
            window.location.reload();
        }
    };
    getUserInfo()
})
//获取用户信息
function getUserInfo(){
    $.ajax({
        type:'POST',
        url:host+'weixin/user/user',
        data:{
            //userId:sessionStorage.userId
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
        erron:function(data){
            alert('服务器请求失败!')
        }

    })
}

//用户信息处理
function dataHandle(data){
    //用户头像
    $('.userPic').attr('src',data.data.headImg)
    //用户名
    $('.userName').text( data.data.nikeName )
}
