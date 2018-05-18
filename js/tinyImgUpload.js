/**
 * tinyImgUpload
 * @param ele [string] [生成组件的元素的选择器]
 * @param options [Object] [对组件设置的基本参数]
 * options具体参数如下
 * path 图片上传的地址路径 必需
 * onSuccess(res) 文件上传成功后的回调 参数为返回的文本 必需
 * onFailure(res) 文件上传失败后的回调 参数为返回的文本 必需
 * @return [function] [执行图片上传的函数]
 * 调用方法
 * tinyImgUpload('div', options)
 */
function tinyImgUpload(ele, options) {
    // 判断容器元素合理性并且添加基础元素
    var eleList = document.querySelectorAll(ele); //获取#upload
    if(eleList.length == 0){
        console.log('绑定的元素不存在');
        return;
    }else if(eleList.length>1){
        console.log('请绑定唯一元素');
        return;
    }else {
        eleList[0].innerHTML ='<div id="img-container">'+
                '<div class="img-up-add  img-item"> <span class="img-add-icon"></span> </div>'+
                '<input type="file" name="files" id="img-file-input" multiple>'+
                '</div>';
        var ele = eleList[0].querySelector('#img-container');
        ele.files = [];   // 当前上传的文件数组
    }

    // 为添加按钮绑定点击事件，设置选择图片的功能
    var addBtn = document.querySelector('.img-up-add');
    addBtn.addEventListener('click',function () {
        document.querySelector('#img-file-input').value = null;
        document.querySelector('#img-file-input').click();
        return false;
    },false)

    // 预览图片
    //处理input选择的图片
    function handleFileSelect(evt) {
        var files = evt.target.files;

        for(var i=0, f; f=files[i];i++){
            // 过滤掉非图片类型文件
            if(!f.type.match('image.*')){4
                continue;
            }
            // 过滤掉重复上传的图片
            var tip = false;
            /*for(var j=0; j<(ele.files).length; j++){
                if((ele.files)[j].name == f.name){
                    tip = true;
                    break;
                }
            }*/
            if(!tip){
                // 图片文件绑定到容器元素上
                ele.files.push(f);
                var reader = new FileReader();
                reader.onload = (function (theFile) {
                    return function (e) { //返回一个函数
                        $('.img-up-add').css('width','48.5%')
                        var oDiv = document.createElement('div');
                        oDiv.className = 'img-thumb img-item';
                        // 向图片容器里添加元素
                        oDiv.innerHTML = '<img class="thumb-icon" src="'+e.target.result+'"/>'+ '<div class="mask_con"></div>'+
                                        '<a href="javscript:;" class="img-remove"></a>'

                        ele.insertBefore(oDiv, addBtn);//创建的存放图片的div排放在添加图片的元素前边
                    };
                })(f);

                reader.readAsDataURL(f);
            }
        }
    }

    // 删除图片
    function removeImg(evt) {
        if(evt.target.className.match(/img-remove/)){
            //console.log('3',ele.files);
            // 获取删除的节点的索引
            function getIndex(ele){

                if(ele && ele.nodeType && ele.nodeType == 1) {
                    var oParent = ele.parentNode;
                    var oChilds = oParent.children;
                    for(var i = 0; i < oChilds.length; i++){
                        if(oChilds[i] == ele)
                            return i;
                    }
                }else {
                    return -1;
                }
            }
            // 根据索引删除指定的文件对象
            var index = getIndex(evt.target.parentNode);
            ele.removeChild(evt.target.parentNode);
            if(index < 0){
                return;
            }else {
                ele.files.splice(index, 1);
            }
            console.log('4',ele.files);
        }
    }
    ele.addEventListener('click', removeImg, false);

    // 上传图片
    function uploadImg() {
        document.querySelector('#img-file-input').addEventListener('change', handleFileSelect, false);
        var xhr = new XMLHttpRequest();
        var formData = new FormData();

        for(var i=0, f; f=ele.files[i]; i++){
            formData.append('files', f);
        }
        xhr.onreadystatechange = function (e) {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    options.onSuccess(xhr.responseText);
                }else {
                    options.onFailure(xhr.responseText);
                }
            }
        }
        xhr.open('POST', options.path, true);
        xhr.send(formData);
    }
    return uploadImg();


/*    var imgContainer = document.getElementById('img-container');
    imgContainer.addEventListener('touchstart',function(){
        gtouchstart()
    })
    imgContainer.addEventListener('touchmove',function(){
        gtouchmove()
    })
    imgContainer.addEventListener('touchend',function(){
        gtouchend()
    })

    var timeOutEvent=0;//定时器
    //开始按
    function gtouchstart(){
        timeOutEvent = setTimeout("longPress()",500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
        return false;
    };
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    function gtouchend(){
        clearTimeout(timeOutEvent);//清除定时器
        if(timeOutEvent!=0){
            //这里写要执行的内容（尤如onclick事件）
            alert("你这是点击，不是长按");
        }
        return false;
    };
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    function gtouchmove(){
        clearTimeout(timeOutEvent);//清除定时器
        timeOutEvent = 0;
    };

    //真正长按后应该执行的内容
    function longPress(){
        timeOutEvent = 0;
        //执行长按要执行的内容，如弹出菜单
        alert("长按事件触发发");
    }*/
}


$(function(){


    $("#upload #img-container").on("click",".thumb-icon", function() {
        bigImg(this)
    });

    $("#upload #img-container").on("touchstart",".thumb-icon", function() {
        gtouchstart()
    });
    $("#upload #img-container").on("touchmove",".thumb-icon", function() {
        gtouchmove()
    });
    $("#upload #img-container").on("touchend",".thumb-icon", function() {
        gtouchend()
    });

    function bigImg(data){
        $(".shadeImg").fadeIn(500);
        $('.showImg').attr('src',$(data).attr("src"))
    }
    /*
     描述：关闭弹出层
     * */
    function closeShadeImg(){
        $(".shadeImg").fadeOut(500);
    }
    $('.shadeImg').click(function(){
        closeShadeImg()
    })


    var timeOutEvent=0;//定时器
    //开始按
    function gtouchstart(){
        timeOutEvent = setTimeout(function(){
            timeOutEvent = 0;
            //执行长按要执行的内容，如弹出菜单
            //alert("长按事件触发发");
            $('.img-remove').show()
        },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
        return false;
    };
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    function gtouchend(){
        clearTimeout(timeOutEvent);//清除定时器
        if(timeOutEvent!=0){
            //这里写要执行的内容（尤如onclick事件）
            // alert("你这是点击，不是长按");
        }
        return false;
    };
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    function gtouchmove(){
        clearTimeout(timeOutEvent);//清除定时器
        timeOutEvent = 0;
    };


})