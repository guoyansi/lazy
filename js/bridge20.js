(function(){
	var Bridge={};
	/**
     * 替换所有指定的字符
     * str 字符串
     * origin 需要替换的字符
     * target 替换成这个字符
     */
    /*Bridge.replaceAll=function(str,origin,target){
        if(str.indexOf(origin)<0){
            return str;
        }else{
            return arguments.callee(str.replace(origin,target),origin,target);
        }
    };*/
    
    /**
     * 格式化时间
     * dateTime 时间(戳)
     * 返回 yyyy-mm-dd
     * 
     * 待完善
     * 1.去除时分秒
     * 
     */
    Bridge.formatDate=function(dateTime,splitf){
        /**
         * 2015-01-05苹果浏览器不支持,改成2015/01/05,
         * dateTime+""是为了防止时间戳没有indexOf方法,报错.
         */
        dateTime=this.replaceAll(dateTime+"","-","/");
        dateTime=new Date(dateTime);
        var currYear =dateTime.getFullYear();
        var currM=dateTime.getMonth()+1;
        var currD=dateTime.getDate();
        if(currM<10){
            currM="0"+currM;
        }
        if(currD<10){
            currD="0"+currD;
        }
        if(!splitf||splitf==1){
            return currYear+"-"+currM+"-"+currD;
        }else if(splitf==2){
            return currYear+"年"+currM+"月"+currD+"日";
        }else if(splitf==3){
            return currYear+"/"+currM+"/"+currD;
        }
    };
    /**
     * 获取时间中的各个元素
     * dataTime  时间
     * element 元素
     * bg.getDateElement("2016-01-01","week");
     * 
     */
    Bridge.getDateElement=function(dateTime,element){
        var currM,currD,week;
        dateTime=this.replaceAll(dateTime+"","-","/");
        dateTime=new Date(dateTime);
        if(element=="yyyy"){
            return dateTime.getFullYear();
        }else if(element=="M"){
            return getM();
        }else if(element=="MM"){
            currM=getM();
            return currM<10?("0"+currM):currM;
        }else if(element=="d"){
            return getD();
        }else if(element=="dd"){
            currD=getD();
            return currD<10?("0"+currD):currD;
        }else if(element=="weekIndex"){
            return dateTime.getDay();
        }else if(element=="weekName"){
        	week=["周日","周一","周二","周三","周四","周五","周六"];
        	return week[dateTime.getDay()];
        }else if(element=="getTime"){
        	return dateTime.getTime();
        }
        function getD(){
            return dateTime.getDate();
        }
        function getM(){
            return dateTime.getMonth()+1;
        }
    };
    /**
     * 查询数组中是否存在指定元素
     * arr 数组
     * element 指定元素
     */
	Bridge.inArray=function(arr,element){
      try{
          if(!(arr instanceof Array)){
              throw new Error("请传入数组");
          }
          for(var i in arr){
              if(arr[i]==element){
                  return true;
              }
          }
          return false;
          
      }catch(e){
          console.error("inArray:>>"+e.message);
      }
	};
	/**
	 * 最终返回一个数组,是两个数组的相同部分
	 * 经过这个方法后,参数中的两个参数交集部分也会被删除
	 * @param arr1 数组1 
	 * @param arr2 数组2
	 */
	Bridge.sameArray=function(arr1,arr2){
		var len=arr1.length;
		var len1=arr2.length;
		var out=0;
		var same=[];
		if(arguments[2]){
			same=arguments[2];
		}
		for(var i=0;i<len;i++){
			for(var j=0;j<len1;j++){
				if(arr1[i]==arr2[j]){
					same.push(arr1[i]);
					arr1.splice(i,1);
					arr2.splice(j,1);
					out++;
					break;
				}
			}
			if(out>0){
				break;
			}
		}
		if(out>0){//找到了相同的元素
			return arguments.callee(arr1,arr2,same);
		}else if(out==0){
			 return same;
		}
	};
	/**
	 * 页面跳转
	 * @param opt
	 */
	/*Bridge.goPage=function(opt){
		var defaults={
			url:"404.html",//路径
			param:{},//带入新页面的参数
			win:window,//
			fail:function(msg){},//跳转失败
			success:function(){}//跳转成功
		};
		try{
			opt=$.extend({},defaults,opt);
			var hrefs=opt.url;
			var n=0;
			for(var p in opt.param){
				if(n==0){
					hrefs+="?";
				}
				else{
					hrefs+="&";
				}
				hrefs+=p+"=";
				hrefs+=opt.param[p];
				n++;
			}
			opt.success();
			opt.win.location.href=hrefs;
		}catch(e){
			opt.fail(e);
		}
	};*/
	/**
	* 当填写参数h后,解析你给的参数,如果为空自动从获取浏览器的地址
	* 测试路径:>>>http://127.0.0.1:8020/url/index.html?id=1.2&gys=7777777777777777777777777&name=思思博士#api/126
	* name是需要获取的值,
	* h是指定href还是要自动获取.
	* 
	* 
	* bg.urlResolve("param")  获取所有参数
	* bg.urlResolve("param:name")  获取参数name
	*/
    Bridge.url=function(name,h){
        if(!name){
            console.error("url缺乏name参数");
            return "";
        }        
        var href=h?h:window.location.href;
        var condition;//条件
        if(name.indexOf(":")>-1){
            condition=name.split(":");
            name=condition[0];
            condition=condition[1];
        }
        
        var search=function(){
            if(h){
                return "?"+href.split("?")[1];
            }else{
                return window.location.search;
            }
        };
        var searchNoP=function(){//不带问号的条件
            return search().substr(1);
        };
        var getPageNameAndExtName=function(){//获取页面名称和扩展名称
            var arr=href.split("?")[0].split("/");
            var len=arr.length;
            return arr[len-1];
        };
       /**
         * 填写了key获取指定的参数
         * 没填写key参数获取所有的参数,以json格式返回
         */
         var getParam=function(key){//获取参数                    
            var query=searchNoP();
            if(!query){
                return null;                            
            }
            var params={};
            var paramArr=query.split("&");
            var len=paramArr.length;
            
            var itemParam=[];
            for(var i=0;i<len;i++){
                itemParam=paramArr[i].split("=");
                params[itemParam[0]]=decodeURIComponent(itemParam[1]);
            }
            if(key){
                return params[key]?decodeURIComponent(params[key]):"";
            }else{
                return params;
            }                    
        };
         
        if(name=="href"){//获取路径,包括参数,包括锚点值
            return href;
        }else if(name=="search"){// 查询(参数)部分  带问号的
            return search();
        }else if(name=="searchNo?"){//不带问号的
            return searchNoP();
        }else if(name=="pathname"){//页面路径 url/index.html,主机名/页面路径
            if(h){
                return "";//待完善
            }else{
                return window.location.pathname;
            }
        }else if(name=="port"){//URL 的端口部分     8080
        	if(h){
               return "";//待完善
            }else{
                 return window.location.port;
            }
        }else if(name=="protocol"){//URL 的协议部分返回值 http:
        	if(h){
                if(href.indexOf("http:")>0){
                	return "http:";
                }else if(href.indexOf("https:")>0){
                	return "https:";
                }else{
                	return "";
                }
            }else{
                return window.location.protocol;
            }
        }else if(name=="host"){//url主机部分返回值   127.0.0.1:8020
        	if(h){
               return "";//待完善
            }else{
               return window.location.host;
            }
        }else if(name=="hrefNo#"){//不带锚值的路径,包括参数
        	return (href.indexOf("#")>=0)?(href.substr(0,href.indexOf("#"))):href;
        	//return href.substr(0,href.indexOf("#")>=0?href.indexOf("#"):href.length);
        }else if(name=="hash"){//锚点后面的值  #api/126
            if(h){
                return href.substr(href.indexOf("#"));
            }else{
               return window.location.hash;
            }
        }else if(name=="hashNo#"){//不带#号的锚点的值  api/126
            if(h){
                return href.substr(href.indexOf("#")+1);
            }else{
               return window.location.hash.substr("1");
            }
        }else if(name=="pageName"){//获取页面名称
            return getPageNameAndExtName().split(".")[0];
        }else if(name=="extName"){//获取扩展名
            return getPageNameAndExtName().split(".")[1];
        }else if(name=="param"){//获取参数
            return getParam(condition?condition:"");
        }else{
            console.error("urlResolve未匹配到你要获取的参数");
            return "";
        }               
    };
    /*
	  * 判断是否是json或实例化的对象
	  * 
	  */
	Bridge.isJsonObj=function(obj){
		return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	};
	/*
	 * 判断是否是空对象
	 * 
	 */
	Bridge.isEmptyJson=function(obj){
		return this.isJsonObj(obj)?(JSON.stringify(obj)=="{}"?true:false):false;
	};
	/**
	 * 数字转汉子
	 * 目前支持[0,99]
	 */
	Bridge.numberToChinese=function(num){
		if(num<0||num>100){
			console.error("numToChinese参数超出范围");
		}
		var code1={"1":"","2":"十","3":"百","4":"千","5":"万"};
		var code2={"0":"零","1":"一","2":"二","3":"三","4":"四","5":"五","6":"六","7":"七","8":"八","9":"九"};
		var numStr=num.toString();
		if(num>=0&&num<=9){
			return code2[num+""];
		}else if(num==10){
			return code1["2"];//十
		}else if(num%10==0){//十的整数倍
			return code2[num/10+""]+code1["2"];
		}else if(num>=11&&num<=19){//11-19
			return code1["2"]+code2[num.toString()[1]];
		}else if(num>=21&&num<99){
			return code2[numStr[0]]+code2[numStr[1]];
		}
	};
	/**
	 * 单数字变双数字字符
	 * @param {Object} num
	 */
	Bridge.doubleNum=function(num){
		num=Number(num);
		return num<10?"0"+num:num+"";
	}
	/**
	 * 是否是小数
	 */
	Bridge.isDecimal=function(num){
		return (num+"").indexOf(".")>=0?true:false;
	}
	/**
	 *是否是空字符串 
	 *有时比较空字符串时,如果是0,也会当做空字符串通过校验
	 */
	Bridge.isEmptyStr=function(str){
		str+="isEmptyStr";
		return str=="isEmptyStr"?true:false;
	}
    /**
     * 无刷新上传
     * 	bg.upload({
			url:"",//上传路径
			name:"",//file name值
			start:function(){},
			end:function(){},
			ext:["png"],//扩展名
			extCallback:function(data){//不允许上传文件时,执行函数
				console.log(data);
			},
			data:{},//上传时 携带的参数
			success:function(data){//上传成功
				
			},
			error:function(){//上传失败
				alert("error");
			}
		});
     * 注意:后台只能返回字符串
     * 如果java中 这样返回(@ResponseBody Map<string,obj>)  会有低版本IE内核的浏览器(360安全模式,猎豹)出现无法接收返回值因而出现异常的原因.
     * 
     * 后台
     * @RequestMapping(value = "/uploadM1", method = RequestMethod.POST)
		@ResponseBody
		public String doUploadFile1(@RequestParam("file") MultipartFile file)
				throws IOException {
			if (!file.isEmpty()) {
				System.out.println("提示:" + file.getOriginalFilename());
				FileUtils.copyInputStreamToFile(file.getInputStream(),new File("d:\\upload\\", System.currentTimeMillis()+ file.getOriginalFilename()));
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", 1);
			map.put("msg", "success");
			return JSONObject.fromObject(map).toString();
		}
     * 
     * 
     * 
     */
	Bridge.upload=function(opts){
		var createUploadIframe = function(id, uri) {
			var frameId = 'jUploadFrame' + id;
			var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
			if(window.ActiveXObject) {
				if(typeof uri == 'boolean') {
					iframeHtml += ' src="' + 'javascript:false' + '"';
	
				} else if(typeof uri == 'string') {
					iframeHtml += ' src="' + uri + '"';
	
				}
			}
			iframeHtml += ' />';
			$(iframeHtml).appendTo(document.body);
	
			return $('#' + frameId).get(0);
		};
		var createUploadForm = function(id, fileElementId, data) {
			var formId = 'jUploadForm' + id;
			var fileId = 'jUploadFile' + id;
			var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
			if(data) {
				for(var i in data) {
					if(data[i].name != null && data[i].value != null) {
						$('<input type="hidden" name="' + data[i].name + '" value="' + data[i].value + '" />').appendTo(form);
					} else {
						$('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
					}
				}
			}
			var oldElement = $('#' + fileElementId);
			var newElement = $(oldElement).clone();
			$(oldElement).attr('id', fileId);
			$(oldElement).before(newElement);
			$(oldElement).appendTo(form);
			$(form).css('position', 'absolute');
			$(form).css('top', '-1200px');
			$(form).css('left', '-1200px');
			$(form).appendTo('body');
			return form;
		};
		//异常处理
		var handleError = function(s, xhr, status, e) {
			if(s.error) {
				s.error.call(s.context || s, xhr, status, e);
			}
		};
		var uploadHttpData = function(r, type) {
			var data = !type;
			if(!type)
				data = r.responseText;
			if(type == "xml")
				data = r.responseXML;
			if(type == "script")
				$.globalEval(data);
			if(type == "json") {
				data = r.responseText;
				var start = data.indexOf(">");
				if(start != -1) {
					var end = data.indexOf("<", start + 1);
					if(end != -1) {
						data = data.substring(start + 1, end);
					}
				}
				eval("data = " + data);
			}
			if(type == "html"){
				$("<div>").html(data).evalScripts();
			}
			return data;
		};
		var ajaxFileUpload = function(s) {
			var id = new Date().getTime();
			var form = createUploadForm(id, s.fileElementId, (typeof(s.data) == 'undefined' ? false : s.data));
			var io = createUploadIframe(id, s.secureuri);
			var frameId = 'jUploadFrame' + id;
			var formId = 'jUploadForm' + id;
			var requestDone = false;
			var xml = {}
			var uploadCallback = function(isTimeout) {
				var io = document.getElementById(frameId);
				try {
					if(io.contentWindow) {
						xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
						xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;
	
					} else if(io.contentDocument) {
						xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
						xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
					}
				} catch(e) {
					handleError(s, xml, null, e);
				}
				if(xml || isTimeout == "timeout") {
					requestDone = true;
					var status;
					try {
						status = isTimeout != "timeout" ? "success" : "error";
						if(status != "error") {
							var data = uploadHttpData(xml, s.dataType);
							if(s.success){
								s.success(data, status);
							}
						} else{
							handleError(s, xml, status);
						}
					} catch(e) {
						alert(2);
						status = "error";
						handleError(s, xml, status, e);
					}
					$(io).unbind()
	
					setTimeout(function() {
						try {
							$(io).remove();
							$(form).remove();
	
						} catch(e) {
							handleError(s, xml, null, e);
						}
	
					}, 100)
	
					xml = null;
	
				}
			}
			if(s.timeout > 0) {
				setTimeout(function() {
					if(!requestDone) uploadCallback("timeout");
				}, s.timeout);
			}
			try {
				var form = $('#' + formId);
				$(form).attr('action', s.url);
				$(form).attr('method', 'POST');
				$(form).attr('target', frameId);
				if(form.encoding) {
					$(form).attr('encoding', 'multipart/form-data');
				} else {
					$(form).attr('enctype', 'multipart/form-data');
				}
				$(form).submit();
			} catch(e) {
				handleError(s, xml, null, e);
			}
	
			$('#' + frameId).load(uploadCallback);
			return {
				abort: function() {}
			};
		};
		//参数默认值
		var defaults = {
			url: "",
			name: "file",
			ext: [], //jpg,gif,mp3
			start:function(){
				
			},
			end:function(){
				
			},
			extCallback: function(data) {
				throw new Error("上传文件不允许通过...");
			},
			success: function(data, status) {
	
			},
			error: function(data, status, e) {
				throw new Error("上传出现异常...");
			}
		};
		opts = $.extend({}, defaults, opts);
		/*if(!opts.obj instanceof jQuery){
			opts.obj=$(opts.obj);
		}*/
		//opts.obj.click(function(){
			var fileID = "fileId" + (new Date()).getTime();
			var objFile = $("<input id='" + fileID + "' type='file' name='" + opts.name + "' style='display:none;' />");
			objFile.appendTo("body");
			objFile.trigger("click");
			objFile.change(function() {
				var path = $(this).val();
				var lastPoint = path.lastIndexOf(".");
				var extName = path.substr(lastPoint + 1);
				var isAllow = false;
				if(opts.ext.length==0){
					isAllow=true;
				}
				for(var i = 0; i < opts.ext.length; i++) {
					if(opts.ext[i] == extName) {
						isAllow = true;
						break;
					}
				}
				if(!isAllow) {
					opts.extCallback({
						uploadStatus: 1,
						uploadMsg: "不是允许上传的文件"
					});
					objFile.remove();
					return;
				}
				opts.start();
				ajaxFileUpload({
					url: opts.url,
					secureuri: false,
					fileElementId: fileID,
					dataType: 'json', //此时指定的是后台需要返回json字符串,前端自己解析,可以注释掉.后台直接返回map
					data: opts.data,
					success: function(data, status) {
						opts.end();
						$("#" + fileID).remove();
						opts.success(data, status);
					},
					error: function(data, status, e) {
						opts.end();
						//这里处理的是网络异常，返回参数解析异常，DOM操作异常  
						$("#" + fileID).remove();
						opts.error(data, status, e);
					}
				});
			});
		//});
	};
	/**
	 * 模板引擎
	 * @param {Object} str
	 * @param {Object} data
	 */
	function htmlEngine(str,data,debug){
			var left_split="@%";
			var right_split="%@";
			var debugStr="";
			//讲关键字替换回来
			var jsSplitKey=function(str){
				str=str.replace(/\@\%/g,"@%");
				str=str.replace(/\%\@/g,"%@");
				return str;
			};
			//去除两边空格
			var trim=function(str){
				return str.replace(/^\s+|\s+$/g,"");
			};
			//去除内部空格
			var trimBetwen=function(str){
				return str.replace(/[\r\t\n]/g, '');
			};
			var pushCode=function(code,isJs){
				debugStr+=code+"\n";
				if(isJs){
					return "htmlArr.push("+code+");\n";
				}else if(code){
					code=setSingleQuotesAround(trimBetwen(trim(code)));
					return "htmlArr.push('"+code+"');\n";
				}else{
					return "";
				}
			};
			//设置单引号
			var setSingleQuotesAround=function(str){
				return str.replace(/'/g,"___'");
			};
			//重置单引号
			var reSetSingleQuotesAround=function(str){
				return str.replace(/___'/g,"\\'");
			}
			//带关键字的js语句
			var keyWord=function(code){
				if(code.indexOf("if")==0||
					code.indexOf("var")==0||
					code.indexOf("for")==0||
					code.indexOf("else")==0||
					code.indexOf("switch")==0||
					code.indexOf("case")==0||
					code.indexOf("continue")==0||
					code.indexOf("break")==0||
					code.indexOf("{")==0||
					code.indexOf("}")==0){
						return true;
				}else{
					return false;
				}
			}
			//str=bgIncludeResolve(trimBetwen(trim(str)));
			//str=setSingleQuotesAround(trimBetwen(trim(str)));
			var codeStr="var bgScope=this;\n";
			codeStr+="var htmlArr=[];\n";
			//一次分割
			var firstSplit=str.split(left_split);
			var firstSplitLen=firstSplit.length;
			//第一次分割的第一个元素一定不是js代码
			codeStr+=pushCode(trim(firstSplit[0]),false);
			//二次分割
			var secondSplit=[];
			var secondSplitLen=0;
			var jsCode="";
			for(var i=1;i<firstSplitLen;i++){
				secondSplit=firstSplit[i].split(right_split);
				secondSplitLen=secondSplit.length;
				if(secondSplitLen==1){//少一个%@
					console.error("1:引擎分隔符不匹配");
				}else if(secondSplitLen==2){//正常
					//js语句
					jsCode=secondSplit[0];
					//jsCode=setSingleQuotesAround(trimBetwen(trim(secondSplit[0])));
					if(keyWord(jsCode)){
						codeStr+=jsCode+"\n";
						debugStr+=jsCode+"\n";
					}else{//普通变量输出或者js代码块的输出
						if(jsCode.indexOf("=")==0){//语句中带有=号 表示是变量输出
							jsCode=jsCode.substr(1);
							codeStr+=pushCode(jsCode,true);
						}else{//普通的js代码块,不以关键字开头的js代码例如:b=true;
							codeStr+=jsCode+"\n";
							debugStr+=jsCode+"\n";
						}
					}
					codeStr+=pushCode(trim(secondSplit[1]),false);
				}else if(secondSplitLen>=3){//多余的%@
					console.error("2:引擎分隔符不匹配");
				}else{
					console.error("3:引擎分隔符不匹配");
				}
			}
			codeStr+="return htmlArr.join('');";
			//console.log(codeStr);
			codeStr=reSetSingleQuotesAround(codeStr);
			//console.log(codeStr);
			codeStr=jsSplitKey(codeStr);
			if(debug){
				console.warn("模板引擎解析后的html:");
				//console.log(codeStr);
				console.log(debugStr);
			}
			return (new Function(codeStr)).apply(data);
		}
	
	 /**
    ********************** 模板引擎
    <ul>
		@%
			var len=bgScope.length;
			var b=false;
			for(var i=0;i<len;i++){
				if(2%3==2){
		%@
			<li>取模成功\@\%</li>
		@%
				}
		%@
			<li>@%=bgScope[i].name%@,@%=bgScope[i].age%@</li>
			参数是字符串的情况
			<li><button onclick="method(\'@%=bgScope[i].name%@\',@%=bgScope[i].age%@)"></button></li>
		@%
			b=true;
			break;
			}
			if(b){
		%@
			<li>跳出循环了</li>
		@%
			}
		%@
	</ul>
	*@param str 待解析的字符串
	*@param data 传入模板中的数据
	* 
	* 展示@%==>\@\%
	* 展示%@==>\%\@
	* 分隔符不再是可配置的.
    */
	Bridge.render=function(str,data,debug){
		return htmlEngine(str,data,debug);
	}
	/**
	 * 模板引擎
	 * 调用 bg.tmp(str,data,debug);
	 * str  字符串
	 * data 数据
	 * debug 是否查看解析后的html
	 * var data={consts:"常量",list:[{name:"郭延思",age:23,job:[{name:"test1",age:22},{name:"test4iiiiiiiiii",age:24}]},{name:"郭延思",age:23,job:[{name:"test1",age:22},{name:"test4iiiiiiiiii",age:24}]}]};
	 * html中bgScope指向data;
	 * <script id="includeScript" type="text/template">我是被引用进来的
		<bg:if test="bg{true}">
			<div style="background-color: red;">我是if真</div>
		</bg:if>
		<bg:include rel="includeScript1" />
	</script>
	 * <script id="foreachScript1" type="text/template">
	 * <bg:var var="myAge" value="23"></bg:var>
		<ul>
			<li><bg:include rel="includeScript" /></li>
			
			<bg:if test="bg{true}">
				<li>我是if true</li>
			</bg:if>
			<bg:if test="bg{true}">
				<li>我是elseif true</li>
			</bg:if>
			<bg:elseif test="bg{true}">
				<div>我是elseif真2</div>
			</bg:elseif>
			<bg:else>
				<li>我是else</li>
			</bg:else>
			<li>我的年龄：bg{myAge}</li>
			<bg:each items="bg{bgScope.list}" var="item" varStatus="status" step="1">
				<li>
					<bg:if test="bg{status.index%2==0}">
						<div>我是偶数项</div>
					</bg:if>
					<bg:else>
						<div>我是基数项</div>
					</bg:else>
					---bg{bgScope.consts};---
					bg{item.name};bg{item.age}>>>
					index:bg{status.index};
					count:bg{status.count};
					first:bg{status.first};
					last:bg{status.last};
					begin  Name:bg{status.begin.name};
					end  age:bg{status.end.age};
					step:bg{status.step}
					<bg:each items="bg{item.job}" var="job" varStatus="jobStatus">
						<div>name:bg{job.name};age:bg{job.age}</div>
					</bg:each>
				</li>
			</bg:each>	
		</ul>
	 * </script>
	 * type=json的循环
	 * <script id="jsonScript" type="text/template">
		<ul>
			<bg:each items="bg{bgScope}" var="item" varStatus="status" type="json">
				<li>bg{item.key}:bg{item.value};index:bg{status.index},count:bg{status.count},first:bg{status.first},last:bg{status.last},step:bg{status.step}</li>
			</bg:each>
		</ul>
	</script>
	 * var data={name:"郭延思",age:26,address:"安徽省合肥市"};
		var html=bg.tmp($("#jsonScript").html(),data);
		$("body").append(html);
	 */
	Bridge.tmp=function(str,data,debug){
		//jquery的replaceWith的<是关键字，需要处理
		var lt=function(str){
			return str.replace(/&lt;/g,"<");
		};
		/**
	 * js执行符号 替换@%
	 */
	var jsSplitStr=function(str){
		str=str.replace(/@%/g,"\@\%");
		str=str.replace(/%@/g,"\%\@");
		return str;
	}
			//处理标签格式
			function replacrTag(str){
				str=str.replace(/bg:if/gm,"bgif");
				str=str.replace(/bg:else/gm,"bgelse");
				str=str.replace(/bg:elseif/gm,"bgelseif");
				str=str.replace(/bg:var/gm,"bgvar");
				str=str.replace(/bg:each/gm,"bgeach");
				str=str.replace(/bg:include/gm,"bginclude");
				return str;
			}
			//解析bg{参数}
			function resoveParam(param) {
				var start = 0;
				var end =0 ;
				var exp1=/^bg{.*}$/;
				var exp2=/^@%=.*%@$/;
				if(exp1.test(param)){
					start=param.indexOf("bg{");
					end=param.lastIndexOf("}");
					return $.trim(param.substring(start+3, end));
				}else if(exp2.test(param)){
					start=param.indexOf("@%=");
					end=param.lastIndexOf("%@");
					return $.trim(param.substring(start+3, end));
				}else{
					return $.trim(param);
				}
				return;
			}
			//剩余未解析的bg{}处理
			function notResolvedParam(oldHtml){
				var exp=/bg{([^}]+)?}/g;
				var cursor=0;
				var placeHolderExpRes=[];
				var newhtml="";
				while(placeHolderExpRes=exp.exec(oldHtml)){
					newhtml+=oldHtml.slice(cursor,placeHolderExpRes.index);
					newhtml+="@%="+placeHolderExpRes[1]+"%@";
					cursor=placeHolderExpRes.index+placeHolderExpRes[0].length;
				}
				newhtml+=oldHtml.substring(cursor);
				return newhtml;
			}
			//寻找bg{任意字符}
			function findBgParam(oldHtml,type,status,xhvar,xhIndex,step,begin,end,items,varName,index){
				//bg{}
				var exp=/bg{([^}]+)?}/g;
				//@%%@
				var exp1=/@%=([^%@]+)?%@/g;
				var cursor=0;
				var placeHolderExpRes=[];
				//最后一次循环标志
				var lastIndex=0;
				var newhtml="";
				var needResove="";
				while((placeHolderExpRes=exp.exec(oldHtml))||(placeHolderExpRes=exp1.exec(oldHtml))){
					needResove=placeHolderExpRes[1];
					var needResoveCopy=needResove;
					newhtml+=oldHtml.slice(cursor,placeHolderExpRes.index);
					//index
					needResove=needResove.replace(status+".index",xhIndex);
					//count
					needResove=needResove.replace(status+".count",xhIndex+"+1");
					//step
					needResove=needResove.replace(status+".step",step);
					//first
					needResove=needResove.replace(status+".first",xhIndex+"==0?true:false");
					if(type=="num"){
						lastIndex=Math.floor((end-1)/step);
						//最后一次迭代返回true
						needResove=needResove.replace(status+".last",lastIndex+"=="+xhIndex+"?true:false");
						//循环开始值
						needResove=needResove.replace(status+".begin",begin);
						//循环结束值
						needResove=needResove.replace(status+".end",lastIndex*step+1);
						needResove=needResove.replace(varName,xhvar);
					}else if(type=="array"){
						lastIndex="Math.floor(("+items+".length-1)/"+step+")";
						//最后一次迭代返回true
						needResove=needResove.replace(status+".last","("+lastIndex+")=="+xhIndex+"?true:false");
						//循环开始值
						needResove=needResove.replace(status+".begin",items+"[0]");
						//循环结束值
						needResove=needResove.replace(status+".end",items+"["+lastIndex+"*"+step+"]");
						//alert(varName+";"+items+"["+xhvar+"]");
						needResove=needResove.replace(varName,items+"["+xhvar+"]");
					}else if(type=="json"){
						/**
						 *没有第一个值，也没有最后一个值
						 */
						lastIndex="Math.floor((Object.keys("+items+").length-1)/"+step+")";
						//最后一次迭代返回true
						needResove=needResove.replace(status+".last","("+lastIndex+")=="+xhIndex+"?true:false");
						needResove=needResove.replace(varName+".key","bgKey"+index);
						needResove=needResove.replace(varName+".value",items+"[bgKey"+index+"]");
					}else{
						throw new Error("bgeach:"+items+"循环类型判断异常...");
					}
					if(needResoveCopy==needResove){
						newhtml+="bg{"+needResove+"}";
					}else{
						newhtml+="@%="+needResove+"%@";
					}
					cursor=placeHolderExpRes.index+placeHolderExpRes[0].length;
				}
				newhtml+=oldHtml.substring(cursor);
				return newhtml;
			}
			function resouveEach(index,$xmlTmp){
				var obj=null;
				var itemsJson={};
				if($("bgeach",$xmlTmp).length>0){
					obj=$("bgeach",$xmlTmp).eq(0);
					var begin=obj.attr("begin");
					var end=obj.attr("end");
					var step=obj.attr("step");
					var items=obj.attr("items");
					//类型（num,json，array循环）
					var type=obj.attr("type");
					if(!type||type!="json"){
						type="array";
					}
					if(begin&&end){
						begin=Number(begin);
						end=Number(end);
						type="num";
					}else if(items){
						items=resoveParam(items);
						if(itemsJson[items]){
							throw new Error("bg:有多个"+items+"循环;指向模糊,循环失败...")
						}else{
							itemsJson[items]=1;
						}
					}else{
						throw new Error("bgeach:没有找到循环对象...");
					}
					if(step){
						step=Number(step);
					}else{
						step=1;
					}
					var varName=obj.attr("var");
					var status=obj.attr("varStatus");
					//用于循环的变量
					var xhvar="bg_i"+index;
					//循环一次+1，从0开始
					var xhIndex="bg_index"+index;
					//最后一次循环标志
					var lastIndex=0;
					var arraylen=0;
					var html=obj.html();
					html=findBgParam(html,type,status,xhvar,xhIndex,step,begin,end,items,varName,index);
					//begin，end循环
					if(type=="num"){
						obj.replaceWith("@%var "+xhIndex+"=-1;for(var "+xhvar+"="+begin+";"+xhvar+"&lt;="+end+";"+xhvar+"="+xhvar+"+"+step+"){"+xhIndex+"++;%@"+html+"@%}%@");
					}else if(type=="array"){
						obj.replaceWith("@%var "+xhIndex+"=-1;var len"+index+"="+items+".length;for(var "+xhvar+"=0;"+xhvar+"&lt;len"+index+";"+xhvar+"="+xhvar+"+"+step+"){"+xhIndex+"++;%@"+html+"@%}%@");
					}else if(type=="json"){
						obj.replaceWith("@% var "+xhIndex+"=-1; for(var bgKey"+index+" in "+items+"){"+xhIndex+"++;%@"+html+"@%}%@");
					}else{
						throw new Error("bgeach:"+items+"循环类型判断异常...");
					}
					index++;
					resouveEach(index,$xmlTmp);
				}
			}
			//标签到js代码（字符串）的转换
			function tagTojs($xmlTmp){
				resouveEach(0,$xmlTmp);
				$("bgvar",$xmlTmp).each(function(){
					var obj=$(this);
					var varName=obj.attr("var");
					var varValue=obj.attr("value");
					varValue=resoveParam(varValue);
					obj.replaceWith("@%var "+varName+"="+varValue+";%@");
				});
				$("bgif",$xmlTmp).each(function(){
					var obj=$(this);
					var test=obj.attr("test");
					test=resoveParam(test);
					var html=obj.html();
					obj.replaceWith("@%if("+test+"){%@"+html+"@%}%@");
				});
				$("bgelseif",$xmlTmp).each(function(){
					var obj=$(this);
					var test=obj.attr("test");
					test=resoveParam(test);
					var html=obj.html();
					obj.replaceWith("@%else if("+test+"){%@"+html+"@%}%@");
				});
				$("bgelse",$xmlTmp).each(function(){
					var obj=$(this);
					var html=obj.html();
					obj.replaceWith("@%else{%@"+html+"@%}%@");
				});
				return $xmlTmp;
			}
			//解析include
			function resoveInclude($xmlTmp){
				if($("bginclude",$xmlTmp).length>0){
					var obj=$("bginclude",$xmlTmp).eq(0);
					var rel=obj.attr("rel");
					var includeHtml="";
					if($("#"+rel).length>0){
						includeHtml=$("#"+rel).html();
						includeHtml=replacrTag(includeHtml);
						obj.replaceWith(includeHtml);
						resoveInclude($xmlTmp);
					}else{
						throw new Error("未找到#"+rel+"模板");
					}
				}else{
					return $xmlTmp;
				}
			}
			function startEngine(str,data){
				str=replacrTag(str);
				str=jsSplitStr(str);
				var xmlTmp="<root>"+str+"</root>";
				var $xmlTmp=$($.parseXML(xmlTmp));
				resoveInclude($xmlTmp);
				$xmlTmp=tagTojs($xmlTmp);
				var html="";
				if($xmlTmp.children().length==0){
					html=$xmlTmp.text();
				}else{
					html=$xmlTmp.children().html();
				}
				var html=notResolvedParam(lt(html));
				if(debug){
					console.warn("模板引擎转换标签后的html:");
					console.log(html);
				}
				return htmlEngine(html,data,debug);
			}
			return startEngine(str,data);
	}
	
	/**
	 * 页面跳转,刷新页面前的拦截
	 * form的submit和window.location.href的拦截,
	 * 用于记录滚动条的位置
	 * isRecordScroll 是否记录滚动条 
	 * 执行form的submit和window.location.href的操作
	 */
Bridge.goPage=function(isRecordScroll,callback){
	if(window.sessionStorage){
		if(typeof isRecordScroll=="function"){
			callback=isRecordScroll;
			isRecordScroll=false;
		}
		var doc=$(document);
		if(typeof isRecordScroll=="boolean"&&isRecordScroll){
			var scrollTop=doc.scrollTop();
			var scrollLeft=doc.scrollLeft();
			window.sessionStorage.setItem("scrollTop",scrollTop);
			window.sessionStorage.setItem("scrollLeft",scrollLeft);
		}else{
			window.sessionStorage.removeItem("scrollTop");
			window.sessionStorage.removeItem("scrollLeft");
		}
	}
	callback();
};
	window.bg=Bridge;
})();

$(function(){
	/*设置滚动条*/
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

