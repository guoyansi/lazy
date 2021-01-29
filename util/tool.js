/***************************ajax拦截********************************/
bg.ajax=function(opts){
    var d={
        load:true,//加载动画
        loadText:"数据处理中...",
        done:true,//是否需要执行成功拦截步骤
        fail:true,//是否需要执行失败统一提示
        always:true,//不管成功和失败,是否都执行always(比如未true:ajax效果在ajax结束后不关闭)
        //contentType:"application/json",
        data:{},
        success:function(data,textStatus,jqXHR){},
        error:function(jqXHR,textStatus,errorThrown){},
        type:"post",
        dataType:"json",
        async:true
    };
    //opts.url=bg.appendAccessToken(opts.url);
    opts = $.extend({}, d, opts);
    //opts.data=JSON.stringify(opts.data);
    if(opts.load){
        $.ui_load({
            icon:1,
            msg:opts.loadText
        });
    }
    var success=opts.success;
    opts.success=function(){};
    $.ajax(opts).done(function(data,textStatus,jqXHR){
        if(!opts.done){
            success(data);
            return;
        }
        let isJson=true;
        if (typeof data == 'string') {
            try {
                var obj=JSON.parse(data);
                if(typeof obj == 'object' && obj ){
                    data=obj;
                    isJson=true;
                }else{
                    isJson=false;
                    //return;
                }
            } catch(e) {
                //return;
                isJson=false;
            }
        }

        //ajax请求时 session失效
        if(isJson&&data.status==3){
            $.ui_dialog({
                type:"e",
                con:data.msg,
                btn:[{name:"确定",action:function(){
                    top.location.href=data.href;
                }}]
            });
        }else{
            success(data);
        }
    }).fail(function(jqXHR, textStatus, errorThrown){
        if(!opts.fail){
            opts.error(jqXHR,textStatus,errorThrown);
            return;
        }
        alert("连接服务器失败！");
        /*$.ui_dialog({
            type:"e",
            con:"连接服务器失败！",
        });*/
    }).always(function(){
        if(!opts.always){
            return;
        }
        if(opts.load){
            $.ui_load_close();
        }
    });
};

/**
 * var dom=$("#dialogForm")[0];
   var fd=new FormData(dom);
   bg.ajaxForm({
        url: "",
        type: "POST",
        data: fd,
        success:function (data) {
            bg.checkAjaxRes(data,function () {
                window.location.href=baseUrl+"/project/yangchenpage?projectId="+data.res;
            });
        }
    });
 */
bg.ajaxForm=function(opts){
    var origin={processData: false,contentType: false};
    opts=$.extend(origin,opts);
    bg.ajax(opts);
};

/**
 * var dom=$("#dialogForm")[0];
   var fd=new FormData(dom);
   bg.ajaxForm({
        url: "",
        type: "POST",
        data: fd,
        success:function (data) {
            bg.checkAjaxRes(data,function () {
                window.location.href=baseUrl+"/project/yangchenpage?projectId="+data.res;
            });
        }
    });
 */
bg.checkAjaxRes=function (data,successCallback,errorCallback) {
    if(data.status==1){
        $.ui_dg({
            type:"s",
            con:data.msg,
            btn:[{name:"确定",action:function () {
                if(successCallback){
                    successCallback();
                }else{
                    window.location.reload(true);
                }
            }}]
        });
    }else{
        $.ui_dg({
            type:"e",
            con:data.msg
        });
    }
};

/***************************ajax拦截********************************/

/**
 * 
 * bg.upload(baseUrl+"/goods/uploadFjDetail",{fjId:fjid},function (data) {
        console.log(data);
        if(data.status==1){
          
        }else{
            alert("上传失败！");
        }
    })
 * 
 * 
 *  @ResponseBody
	@RequestMapping("/uploadFjDetail")
	public HttpResult uploadFjDetail(@RequestParam("file") MultipartFile file,Long fjId)throws Exception{
	     return service.uploadFjDetail(file,fjId,sort);
	}
 * @param {Object} url
 * @param {Object} jsonData
 * @param {Object} successCallback
 * @param {Object} errorCallback
 * @param {Object} completeCallback
 */
bg.upload=function(url,jsonData,successCallback,errorCallback,completeCallback){
    $.ui_load({
        icon:1,
        msg:"上传中..."
    });
    if(jsonData==null){
        jsonData={};
    }
    //$("#"+id).click();
    var objectInput=$('<input id="fileuploadId" type="file" name="file" style="display: none">');
    $("body").append(objectInput);
    objectInput.click();
    objectInput.change(function () {
        var formData = new FormData();
        formData.append("file", document.getElementById("fileuploadId").files[0]);
        for(var k in jsonData){
            formData.append(k,jsonData[k]);
        }
        $.ajax({
            url:url,
            type: "POST",
            data: formData,
            /**
             *必须false才会自动加上正确的Content-Type
             */
            contentType: false,
            /**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */
            processData: false,
            success:function (data) {
                successCallback(data);
            },
            error: function () {
                typeof errorCallback=="function"?errorCallback():alert("上传失败！");
            },
            complete:function () {
                objectInput.remove();
                $.ui_load_close();
                typeof completeCallback=="function"?completeCallback():"";
            }
        });
    });

};


/**
 * 将list装换成tree
 * @param {Object} myId  数据主键id
 * @param {Object} pId     数据关联的父级id
 * @param {Object} list list集合
 *console.log(JSON.stringify(listToTree("ids","parentId",list)));
 console.log(listToTree("ids","parentId",list));
 */
bg.listToTree=function(myId,pId,list){
    function exists(list, parentId){
        for(var i=0; i<list.length; i++){
            if (list[i][myId] == parentId) return true;
        }
        return false;
    }

    var nodes = [];
    // get the top level nodes
    for(var i=0; i<list.length; i++){
        var row = list[i];
        if (!exists(list, row[pId])){
            nodes.push(row);
        }
    }

    var toDo = [];
    for(var i=0; i<nodes.length; i++){
        toDo.push(nodes[i]);
    }
    while(toDo.length){
        var node = toDo.shift();    // the parent node
        // get the children nodes
        for(var i=0; i<list.length; i++){
            var row = list[i];
            if (row[pId] == node[myId]){
                //var child = {id:row.id,text:row.name};
                if (node.children){
                    node.children.push(row);
                } else {
                    node.children = [row];
                }
                toDo.push(row);
            }
        }
    }
    return nodes;
};
bg.listToTree1=function(list){
    var myId="id";
    var pId="parentId";

    function exists(list, parentId){
        for(var i=0; i<list.length; i++){
            if (list[i][myId] == parentId) return true;
        }
        return false;
    }

    var nodes = [];
    // get the top level nodes
    for(var i=0; i<list.length; i++){
        var row = list[i];
        if (!exists(list, row[pId])){
            nodes.push(row);
        }
    }

    var toDo = [];
    for(var i=0; i<nodes.length; i++){
        toDo.push(nodes[i]);
    }
    while(toDo.length){
        var node = toDo.shift();    // the parent node
        // get the children nodes
        for(var i=0; i<list.length; i++){
            var row = list[i];
            if (row[pId] == node[myId]){
                node.state="closed";
                //var child = {id:row.id,text:row.name};
                if (node.children){
                    node.children.push(row);
                } else {
                    node.children = [row];
                }
                toDo.push(row);
            }
        }
    }
    return nodes;
};


/*设置滚动条*/
$(function(){
    if(!window.sessionStorage){
        return ;
    }
    var scrollTop=window.sessionStorage.getItem("scrollTop");
    var scrollLeft=window.sessionStorage.getItem("scrollLeft");
    if(scrollTop&&scrollLeft){
        scrollTop=Number(scrollTop);
        scrollLeft=Number(scrollLeft);
        var doc=$(document);
        doc.scrollTop(scrollTop);
        doc.scrollLeft(scrollLeft);
        window.sessionStorage.removeItem("scrollTop");
        window.sessionStorage.removeItem("scrollLeft");
    }
});
/**************************设置滚动条**************************************/

(function(){
    var defaults={
        start:function(event){},//手指按下
        move:function(event){},//手指移动
        end:function(event){}//手指抬起
    }
    $.fn.touchClick=function(opts){
    	if(typeof opts=="function"){
    		opts=$.extend({}, defaults,{end:opts});
    	}else{
    		opts=$.extend({}, defaults,opts);
    	}
        this.each(function(){
            var obj=$(this);
            obj.on("touchstart",function(event){
            	$("#gys").html("start");
                obj.data("move",false);
                opts.start.call(this,event);
            }).on("touchmove",function(event){
                obj.data("move",true);
                opts.move.call(this,event);
            }).on("touchend",function(event){
            	$("#gys").append("end");
                if(obj.data("move")){
                    return;
                }else{
                    opts.end.call(this,event);
                }
                obj.data("move",false);
            });
        });
    };
})(jQuery);

bg.goPage=function(url){
	//拼接路径得到新路径，实现跳转
	window.location.href=url;
};

/************************常用正则表达式****************************************/
bg.z={
    phone:/^1(3|4|5|7|8)\d{9}$/,//手机号
    email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,//邮箱
    card:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证号
    china:/[\u4E00-\u9FA5\uF900-\uFA2D]/,//中文
    englisAndNumber:/^[0-9a-zA-Z]*$/g//只有数字和字母
};
/************************正则表达式****************************************/