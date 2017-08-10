(function(){
	//var Bridge={};
	function Bridge(param){
		return new OtherBridge(param);
	}
	function OtherBridge(param){
		this.param=param;		
	}
	
	/**
	* 当填写参数h后,解析你给的参数,如果为空自动从获取浏览器的地址
	* 测试路径:>>>http://127.0.0.1:8020/url/index.html?id=1.2&gys=7777777777777777777777777&name=思思博士#api/126
	* name是需要获取的值,
	* h是指定href还是要自动获取.
	* 
	* 
	* bg.url("param")  获取所有参数
	* bg.url("param:name")  获取参数name
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
			ext:["png"],//扩展名
			count:-1,//上传个数,-1不限制
			size:-1,//上传大小,-1不限制,单位是M
			multiple:false,//批量上传
			extFilter:true,//开启系统的扩展名过滤
			start:function(){},
			checkFiles:function(data){
				return true;
			},
			end:function(){},
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
     * 后台(单个上传)
     * @RequestMapping(value = "/uploadM1", method = RequestMethod.POST)
		@ResponseBody
		public String doUploadFile1(@RequestParam("file") CommonsMultipartFile file)
				throws IOException {
			String curProjectPath=request.getServletContext().getRealPath("/upload");
			File saveFile=new File(curProjectPath);
			if(!saveFile.exists()&&!saveFile.isDirectory()){
				saveFile.mkdir();
			}
			if (!file.isEmpty()) {
				System.out.println("提示:" + file.getOriginalFilename());
				FileUtils.copyInputStreamToFile(file.getInputStream(),new File(curProjectPath, System.currentTimeMillis()+ file.getOriginalFilename()));
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", 1);
			map.put("msg", "success");
			//返回字符串,返回map会有低版本的ie兼容问题
			return JSONObject.fromObject(map).toString();
		}
     * 
     * 后台(批量上传)
     * 
     * 
     * @ResponseBody
	@RequestMapping(value = "/uploadM2", method = RequestMethod.POST)
	public String doUploadFile1(@RequestParam("files") CommonsMultipartFile[] files,HttpServletRequest request)
			throws IOException {
				//List<Map<String,String>> list=new ArrayList<Map<String,String>>();
				List<String> list=new ArrayList<String>();
				for(CommonsMultipartFile file:files){
					String oldFileName=file.getOriginalFilename();
					System.out.println("文件名:" + oldFileName);
					//String dex = oldFileName.substring(oldFileName.lastIndexOf(".")).toLowerCase();
					String curProjectPath=request.getServletContext().getRealPath("/upload");
					//String saveDirectoryPath = request.getContextPath() + "/upload/";
					File saveFile=new File(curProjectPath);
					if(!saveFile.exists()&&!saveFile.isDirectory()){
						saveFile.mkdir();
					}
					//String newFileName=UUID.randomUUID()+dex;
					File pathFile=new File(curProjectPath, oldFileName);
					FileUtils.copyInputStreamToFile(file.getInputStream(),pathFile);
					String newPath=saveDirectoryPath+oldFileName;
					list.add(newPath);
				}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", 1);
			map.put("msg", "success");
			map.put("list", list);
			//返回字符串,返回map会有低版本的ie兼容问题
			return JSONObject.fromObject(map).toString();
	}
	}
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
		/**
		 * 检查扩展名
		 * @param {Object} path
		 * @param {Object} ext
		 * @param {Object} extIngoreCase
		 */
		var checkExtName=function(path,ext,extIngoreCase){
			var isAllow=false;
			var lastPoint = path.lastIndexOf(".");
			var extName = path.substr(lastPoint + 1);
			for(var i = 0; i < ext.length; i++) {
				if(extIngoreCase){
					if(ext[i].toLowerCase() == extName.toLowerCase()) {
						isAllow = true;
						break;
					}
				}else{
					if(opts.ext[i]== extName) {
						isAllow = true;
						break;
					}
				}
			}
			return isAllow;
		};
		var extName={
			"3gpp":"audio/3gpp,video/3gpp",
			"ac3":"audio/ac3",
			"asf":"allpication/vnd.ms-asf",
			"au":"audio/basic",
			"css":"text/css",
			"csv":"text/csv",
			"doc":"application/msword",
			"dot":"application/msword",
			"dtd":"application/xml-dtd",
			"dwg":"image/vnd.dwg",
			"dxf":"image/vnd.dxf",
			"gif":"image/gif",
			"htm":"text/html",
			"html":"text/html",
			"jp2":"image/jp2",
			"jpe":"image/jpeg",
			"jpeg":"image/jpeg",
			"jpg":"image/jpeg",
			"js":"text/javascript,application/javascript",
			"json":"application/json",
			"mp2":"audio/mpeg,video/mpeg",
			"mp3":"audio/mpeg",
			"mp4":"audio/mp4,video/mp4",
			"mpeg":"video/mpeg",
			"mpp":"application/vnd.ms-project",
			"ogg":"application/ogg, audio/ogg",
			"pdf":"application/pdf",
			"png":"image/png",
			"pot":"application/vnd.ms-powerpoint",
			"pps":"application/vnd.ms-powerpoint",
			"ppt":"application/vnd.ms-powerpoint",
			"rtf":"application/rtf,text/rtf",
			"svf":"image/vnd.svf",
			"tif":"image/tiff",
			"tiff":"image/tiff",
			"txt":"text/plain",
			"wdb":"application/vnd.ms-works",
			"wps":"application/vnd.ms-works",
			"xhtml":"application/xhtml+xml",
			"xlc":"application/vnd.ms-excel",
			"xlm":"application/vnd.ms-excel",
			"xls":"application/vnd.ms-excel",
			"xlt":"application/vnd.ms-excel",
			"xlw":"application/vnd.ms-excel",
			"xml":"text/xml,application/xml",
			"zip":"aplication/zip"
		};
		var setAccept=function(ext,filter){
			if(!filter){
				return "*";
			}
			var accept=[];
			var len=ext.length;
			for(var i=0;i<len;i++){
				if(accept.indexOf(extName[ext[i]])==-1){
					accept.push(extName[ext[i]]);
				}
			}
			if(accept.length==0){
				return "*";
			}else{
				return accept.join(",");
			}
		}
		//参数默认值
		var defaults = {
			url: "",
			name: "file",
			ext: [], //jpg,gif,mp3
			extFilter:true,//开启系统的扩展名过滤
			multiple:false,//多文件上传
			count:-1,//上传个数,-1不限制
			size:-1,//上传大小,-1不限制,单位是M
			start:function(){
				
			},
			checkFiles:function(files,val){
				return true;
			},
			success: function(data, status) {
	
			},
			error: function(msg) {
				throw new Error(msg?msg:"上传出现异常...");
			},
			end:function(){
				
			},
		};
		opts = $.extend({}, defaults, opts);
		var fileID = "fileId" + (new Date()).getTime();
		var m ="";
		if(opts.multiple){
			m="multiple='multiple'";
		}
		var objFile=$("<input id='" + fileID + "' type='file' accept="+setAccept(opts.ext,opts.extFilter)+" name='" + opts.name + "' style='display:none;' "+m+" />");
		objFile.appendTo("body");
		objFile.trigger("click");
		objFile.change(function() {
			var files=objFile.get(0).files;
			if(!opts.checkFiles(files,objFile.val())){
				objFile.remove();
				return;
			}
			if(opts.count!=-1&&files.length>opts.count){
				opts.error("上传数量过多，超出"+opts.count+"个文件");
				objFile.remove();
				return;
			}
			var size=0;
			for(var i=0;i<files.length;i++){
				size+=files[i].size;
			}
			size=(size/1024/1024).toFixed(2);
			if(opts.size!=-1&&size>opts.size){
				opts.error("当前文件："+size+"M,超出"+opts.size+"M");
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
					opts.error("上传失败");
				}
			});
		});
	};
	/**
	 * 模板引擎
	 * @param {Object} str
	 * @param {Object} data
	 */
	function htmlEngine(str,data,debug){
			var left_split="@%";
			var right_split="%@";
			//将关键字替换回来
			var jsSplitKey=function(str){
				str=str.replace(/\@\%/g,"@%");
				str=str.replace(/\%\@/g,"%@");
				return str;
			};
			//去除两边空格
			var trim=function(str){
				return str.replace(/^\s+|\s+$/g,"");
			};
			//去除内部空格(制表符,换行,空格)
			var trimBetwen=function(str){
				return str.replace(/[\r\t\n]/g, '');
			};
			var pushCode=function(code,isJs){
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
					}else{//普通变量输出或者js代码块的输出
						if(jsCode.indexOf("=")==0){//语句中带有=号 表示是变量输出
							jsCode=jsCode.substr(1);
							codeStr+=pushCode(jsCode,true);
						}else{//普通的js代码块,不以关键字开头的js代码例如:b=true;
							codeStr+=jsCode+"\n";
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
				console.warn("模板引擎render解析后的:");
				console.log(codeStr);
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
	* bg.render(str,data);
    */
	Bridge.render=function(str,data,debug){
		return htmlEngine(str,data,debug);
	}
	/**
	 * 
	 实例:
	 *bg("#tempScript").render(data,true);
	 */
	OtherBridge.prototype.render=function(data,debug){
		return htmlEngine($(this.param).html(),data,debug);
	};
	function tmpEngine(str,data,debug){
		function isJsonObj(obj){
			return typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
		};
		//去除两边空格
		var trim=function(str){
			return str.replace(/^\s+|\s+$/g,"");
		};
		
		//includ标签解析
		function includeTag(str){
			var arr=str.split("<bg:include");
			var len=arr.length;
			var newStr=arr[0];
			var failTagIndex=0
			for(var i=1;i<len;i++){
				failTagIndex=arr[i].indexOf("/>");
				var includeStr=arr[i].substring(0,failTagIndex);
				var $xml=$.parseXML("<root><bgInclude "+includeStr+"></bgInclude></root>");
				var obj=$("bgInclude",$xml);
				var rel=obj.attr("rel");
				var html=$("#"+rel).html();
				newStr+=html+arr[i].substr(failTagIndex+2);
			}
			if(newStr.indexOf("<bg:include")==-1){
				return newStr;
			}else{
				return includeTag(newStr);
			}
			
		}
		//处理尾部标签
		function tagFail(str){
			str=str.replace(/<\/bg:if>/gm,"@%}%@");
			str=str.replace(/<bg:else>/gm,"@%else{%@");
			str=str.replace(/<\/bg:else>/gm,"@%}%@");
			str=str.replace(/<\/bg:elseIf>/gm,"@%}%@");
			str=str.replace(/<\/bg:var>/gm,"");
			str=str.replace(/<\/bg:each>/gm,"@%}%@");
			return str;
		}
		
		//去除内部空格
		/*var trimBetwen=function(str){
			return str.replace(/[\r\t\n]/g, '');
		};*/
		
		/**
		 * if或elseIf条件解析
		 */
		function ifTagTojs(str,type){
			var arr=str.split(type);
			var len=arr.length;
			var newStr=arr[0];
			var ifConditionStr="";
			var lsArr=[];
			var lsIndex=0;
			var condition="";
			//var lsStr='test="bg{';
			var lsStr='{';
			var failTagIndex=0;
			var rightKhIndex=0;
			
			for(var i=1;i<len;i++){
				//获取右括号位置,
				rightKhIndex=arr[i].indexOf("}");
				//有括号位置后面的 尖括号 才是结尾,if条件中的比较符号(>)会造成干扰
				failTagIndex=arr[i].indexOf(">",rightKhIndex);
				//if条件的str  包括bg{}
				ifConditionStr=trim(arr[i].substring(0,failTagIndex));
				var start=ifConditionStr.indexOf(lsStr);
				if(start==-1){
					console.error("if条件异常....");
				 	return;
				}
				var end=ifConditionStr.indexOf("}");
				condition=ifConditionStr.substring(start+lsStr.length,end);
				if(type=="<bg:if"){
					newStr+="@%if("+condition+"){%@";
				}else{
					newStr+="@%else if("+condition+"){%@";
				}
				newStr+=arr[i].substr(failTagIndex+1);
			}
			return newStr;
		}
		function elseTagToJs(str){
			var arr=str.split("<bg:else");
			var len=arr.length;
			var newStr=arr[0];
			var failTagIndex=0;
			for(var i=1;i<len;i++){
				failTagIndex=arr[i].indexOf(">");
				newStr+="@%else{%@";
				newStr+=arr[i].substr(failTagIndex+1);
			}
			return newStr;
		}
		/**
		 * 
		 * <bg:var myAge="bg{2+1}" ></bg:var>
		   <bg:var myAge="2+1" ></bg:var>
		   <bg:var myAge=2+1 ></bg:var>
		 * 
		 */
		function varTagToJs(str){
			var arr=str.split("<bg:var");
			var len=arr.length;
			var varStr="";
			var varArr=[];
			var newStr=arr[0];
			var failTagIndex=0;
			for(var i=1;i<len;i++){
				failTagIndex=arr[i].indexOf(">");
				varStr=arr[i].substring(0,failTagIndex);
				varArr=varStr.split("=");
				var k=trim(varArr[0]);
				var v=varArr[varArr.length-1];
				var sIndex=v.indexOf("bg{");
				if(sIndex!=-1){
					v=trim(v);
					sIndex=v.indexOf("bg{");
					v=v.substring(sIndex+3,v.length-2);
				}
				newStr+="@%var "+k+"="+v+";%@";
				newStr+=arr[i].substr(failTagIndex+1);
			}
			return newStr;
		}
		/**
		 * each标签解析
		 * @param {Object} str
		 */
		function eachTagToJs(str){
			var arr=str.split("<bg:each");
			var len=arr.length;
			var eachStr="";
			var newStr=arr[0];
			var failTagIndex=0;
			for(var i=1;i<len;i++){
				failTagIndex=arr[i].indexOf(">");
				eachStr=trim(arr[i].substring(0,failTagIndex));
				var $xml=$.parseXML("<root><bgeach "+eachStr+"></bgeach></root>");
				var obj=$("bgeach",$xml);
				var items=obj.attr("items");
				if(items){
					items=trim(items);					
				}
				var step=obj.attr("step");
				step=step?step:1;
				var item=obj.attr("item");
				var status=obj.attr("status");
				var begin=obj.attr("begin");
				var end=obj.attr("end");
				var type=obj.attr("type");
				if(!type){
					type="array";
				}
				//用于循环的变量
				var xhvar="bg_i"+i;
				//循环一次+1，从0开始
				var xhIndex="bg_index"+i;
				var arraylen="bg_len"+i;
				var k="bg_key"+i;
				var xhCount="xhCount"+i;
				//集合循环
				if(items&&type=="array"){
					var collection=items.substring(3,items.length-1);
					newStr+="@%var "+arraylen+"="+collection+".length;";
					//数组或字符串循环
					newStr+="var "+xhCount+"=0;";
					newStr+="for(var "+xhvar+"=0;"+xhvar+"<"+arraylen+";"+xhvar+"+="+step+"){";
					newStr+="var "+item+"="+collection+"["+xhvar+"];";
					if(status&&isNaN(status)){
						newStr+="var "+status+"={first:false,last:true};";
						newStr+="if("+xhvar+"==0){"+status+".first=true}else{"+status+".fist=false}";
						newStr+="if("+xhvar+"+"+step+">="+arraylen+"){"+status+".last=true;}else{"+status+".last=false;}";
						newStr+=status+".index="+xhvar+";";
						newStr+=status+".count=++"+xhCount+";";
						newStr+=status+".step="+step+";";
					}
					newStr+="%@";
					newStr+=arr[i].substr(failTagIndex+1);
				}else if(items&&type==="json"){
					var collection=items.substring(3,items.length-1);
					newStr+="@%var "+xhCount+"=0;";
					newStr+="var maxCount=0;for(var "+k+" in "+collection+"){maxCount++;}";
					newStr+="for(var "+k+" in "+collection+"){";
					newStr+="var "+item+"={key:"+k+",value:"+collection+"["+k+"]};";
					if(status&&isNaN(status)){
						newStr+="var "+status+"={first:false,last:true,step:1};";
						newStr+=status+".count=++"+xhCount+";";
						newStr+="if("+xhCount+"==1){"+status+".first=true;}else{"+status+".first=false;}";
						newStr+="if("+xhCount+"==maxCount){"+status+".last=true;}else{"+status+".last=false;}";
					}
					newStr+="%@";
					newStr+=arr[i].substr(failTagIndex+1);
				}else{//begin-end 数据的变化
					if(begin==undefined||end==undefined){
						console.log("beeach中的begin和end异常...");
						return;
					}
					var bjf="<=";
					if(step<0){
						bjf=">=";	
					}
					newStr+="@%for(var "+xhvar+"="+begin+";"+xhvar+bjf+end+";"+xhvar+"+="+step+"){";
					newStr+="var "+item+"="+xhvar+";";
					if(status&&isNaN(status)){
						newStr+="var "+status+"={}";
						newStr+=status+".count=++"+xhCount;
						newStr+="if("+xhCount+"==1){"+status+".first=true;}else{"+status+".fist=false;}";
						newStr+="if("+xhCount+"==maxCount){"+status+".last=true;}else{"+status+".last=false;}";
					}
					newStr+="%@";
					newStr+=arr[i].substr(failTagIndex+1);
				}
			}
			return newStr;
		}
		/**
		 * 寻找bg{任意字符}
		 */
		function findBgParam(oldHtml){
			var exp=/bg{([^}]+)?}/g;
			var cursor=0;
			var placeHolderExpRes=[];
			var newhtml="";
			while(placeHolderExpRes=exp.exec(oldHtml)){
				newhtml+=oldHtml.slice(cursor,placeHolderExpRes.index);
				//index
				newhtml+="@%="+placeHolderExpRes[1]+"%@";
				
				cursor=placeHolderExpRes.index+placeHolderExpRes[0].length;
			}
			newhtml+=oldHtml.substring(cursor);
			return newhtml;
		}
		s=includeTag(str);
		s=tagFail(s);
		s=ifTagTojs(s,"<bg:if");
		s=ifTagTojs(s,"<bg:elseIf");
		s=elseTagToJs(s);
		s=varTagToJs(s);
		s=eachTagToJs(s);
		s=findBgParam(s);
		return s;
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
			<bg:each items="bg{bgScope.list}" item="item" status="status" step="1">
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
					step:bg{status.step}
					<bg:each items="bg{item.job}" var="job" status="jobStatus">
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
				<li>bg{item.key}:bg{item.value};count:bg{status.count},first:bg{status.first},last:bg{status.last}</li>
			</bg:each>
		</ul>
	</script>
	 * var data={name:"郭延思",age:26,address:"安徽省合肥市"};
		var html=bg.tmp($("#jsonScript").html(),data);
		$("body").append(html);
	 */
Bridge.tmp=function(str,data,debug){
	var s=tmpEngine(str,data);
	if(debug){
		console.warn("模板引擎tmp解析后的:");
		console.log(s);
	}
	return htmlEngine(s,data,debug);
}
/**
 * var html=bg("#scriptTmp").tmp(data,debug);
 * @param {Object} data
 * @param {Object} debug
 */
OtherBridge.prototype.tmp=function(data,debug){
	var s=tmpEngine($(this.param).html(),data);
	if(debug){
		console.warn("模板引擎tmp解析后的:");
		console.log(s);
	}
	return htmlEngine(s,data,debug);
};	
/**
 * <div id="form">
		<input name="name" type="text" value="gys" />
		<input name="age" type="text" value="26" />
		<select name="department">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<input name="sex" type="radio"  value="男"/>
		<input name="sex" type="radio" checked="checked"  value="女"/>
		<input name="job" type="checkbox"  checked="checked" value="乒乓球"/>
		<input name="job" type="checkbox" checked="checked" value="足球"/>
		<textarea name="dex">我是描述文件</textarea>
		<input name="hidden" type="hidden"  value="我是隐藏的....."/>
		<button onclick="getParam()">获取数据</button>
	</div>
 * 
 * 获取需要提交的数去
 * @b {Boolean} true返回json,false返回字符串
 * bg("#form").getForm(true);
 */
OtherBridge.prototype.getForm=function(b){
	var res={};
	$("[name]",$(this.param)).each(function(){
		var obj=$(this);
		var tag=obj[0].tagName.toLocaleLowerCase();
		var type=obj.attr("type");
		var name=obj.attr("name");
		if(tag=="input"){
			if(type=="text"||type=="radio"||type=="hidden"||type=="file"||type=="password"){
				res[name]=obj.val();
			}else if(type=="radio"&&obj.is(":checked")){
				res[name]=obj.val();
			}else if(type=="checkbox"&&obj.is(":checked")){
				res[name]?res[name].push(obj.val()):res[name]=[obj.val()];
			}
		}else if(tag=="select"||tag=="textarea"){
			res[name]=obj.val();
		}
	});
	if(!b){
		res=JSON.stringify(res);
	}
	return res;
};
window.bg=Bridge;
})();



/*****************************************jquery工具函数********************************************************/
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