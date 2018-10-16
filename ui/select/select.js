(function($){
	var stopMeth=function(){};
	var checkedMeth=function(){};
	var startMeth=function(){};
	//生成option  html
	var optionHtml=function(obj){
		var list=obj.data("list");
		var len=list.length;
		var html="";
		var searchStr=$(".ui-select-slide-search").val();
		searchStr?"":searchStr="";
		var checked="";
		var display="";
		for(var i=0;i<len;i++){
			display="";
			if(list[i].checked){
				checked="checked='checked'";				
			}else{
				checked="";
			}
			if(list[i].txt.indexOf(searchStr)>-1){//显示
				display="display:block";			
			}else{//隐藏
				display="display:none";
			}
			html+="<p class='ui-select-slide-con-item' style='"+display+"'>";
			html+="<input class='ui-select-slide-checkbox' type='checkbox' "+checked+" value='"+list[i].value+"' />"+list[i].txt;
			html+="</p>";		
		}
		return html;
	}
	//单击选项
	var clickOption=function(obj,targetValue){
		/*if(!enableEmpty&&$(".ui-select-slide-checkbox:checked").length<=1){//不允许为空
			return;
		}*/
		if(targetValue=="all"){//单击的是所有
			if($(".ui-select-slide-checkbox[value='all']").is(":checked")){
				$(".ui-select-slide-checkbox").prop("checked",true);
			}else{
				$(".ui-select-slide-checkbox").prop("checked",false);
			}
		}else{//单机的是其他
			if($(".ui-select-slide-checkbox:not(:checked)").not("[value=all]").length>0){
				$(".ui-select-slide-checkbox[value='all']").prop("checked",false);
			}else{
				$(".ui-select-slide-checkbox[value='all']").prop("checked",true);
			}
		}
		changeList(obj);
		inputConChange(obj);
	};
	//填充文本框
	var inputConChange=function(obj){
		var list=obj.data("list");
		var txts=[];
		var len=list.length;
		if(list[0].value=="all"&&list[0].checked){
			txts=[list[0].txt];
		}else{
			for(var i=0;i<len;i++){
				if(list[i].checked){
					txts.push(list[i].txt);
				}
			}
		}
		obj.val(txts.join(","));
	};
	//更新list
	var changeList=function(obj){
		var values=[];
		$(".ui-select-slide-checkbox:checked").each(function(index){
			values.push($(this).val());
		});
		var list=obj.data("list");
		var len=list.length;
		var len1=values.length;
		for(var i=0;i<len;i++){
			list[i].checked=false;
			for(var j=0;j<len1;j++){
				if(list[i].value==values[j]){
					list[i].checked=true;
					break;
				}
			}
		}
		obj.data("list",list);
	};
	
	var slideHtml=function(obj,search,zIndex,enableEmpty){
		var offset=obj.offset();
		var left=offset.left;
		var top=offset.top;
		var h=obj.outerHeight();
		var html="";
		html+="<div class='ui-select-slide-box' style='left:"+left+"px;top:"+(top+h+1)+"px;z-index:"+zIndex+";width:"+obj.outerWidth()+"px'>";
		if(search){
			html+="<div class='ui-select-slide-search-box'>";
			html+="<input class='ui-select-slide-search' placeholder='模糊搜索' />";
			html+="</div>";
		}
		html+="<div class='ui-select-slide-con-box'>";
		html+=optionHtml(obj);
		html+="</div>";
		html+="</div>";
		$("body").append(html);
		/*if($(".ui-select-slide-checkbox:not(:checked)").not("[value=all]").length==0){
			$(".ui-select-slide-checkbox[value='all']").prop("checked",true);
		}*/
		$(".ui-select-slide-box").data("target",obj);
		$(".ui-select-slide-box").click(function(e){
			e.stopPropagation();
		}).on("click",".ui-select-slide-con-item",function(){
			var self=$(".ui-select-slide-checkbox",this);
			var checked=self.prop("checked");
			self.prop("checked",!checked);
			clickOption(obj,self.val(),enableEmpty);
		}).on("click",".ui-select-slide-checkbox",function(e){
			clickOption(obj,$(this).val(),enableEmpty);
			e.stopPropagation();
		});
		$(".ui-select-slide-search").keyup(function(){
			$(".ui-select-slide-con-box").html(optionHtml(obj));
		});
	}
	
	$(document).click(function(e){
		//$(".ui-select-slide-box").remove();
		stopChecked();
	});
	$(window).resize(function(){
		//$(".ui-select-slide-box").remove();
		stopChecked();
	});
	$.fn.ui_get_select=function(type){
		var list=this.data("list");
		var len=list.length;
		var isAll=false;
		var i=0;
		if(list[0].value=="all"&&list[0].checked){
			isAll=true;
			i=1;
		}
		var res=[];
		for(;i<len;i++){
			if(!list[i].checked){
				continue;
			}
			if(type=="value"){
				res.push(list[i].value);
			}else if(type=="txt"){
				res.push(list[i].txt);
			}else{
				res.push([list[i].value,list[i].txt]);
			}
		
		}
		return {isAll:isAll,data:res};
	};
	//如果是select标签
	var ifSelectTag=function(obj,all){
		var list=[];
		if(all){
			list=[{value:"all",txt:"全部"}];
		}
		var selected=false;
		$("option",obj).each(function(){
			var self=$(this);
			list.push({value:self.val(),txt:self.html(),checked:self.attr("selected")?true:false});
		});
		var clsName=obj.attr("class");
		var idName=obj.attr("id");
		var name=obj.attr("name");
		var newObj=$("<input id='"+(idName?idName:'')+"' class='"+(clsName?clsName:'')+"' name='"+(name?name:'')+"' />");
		obj.replaceWith(newObj);
		newObj.data("list",list);
		return newObj;
	}
	
	var stopChecked=function(){
		var box=$(".ui-select-slide-box");
		if(box.length>0){
			box.remove();
			stopMeth();	
		}
	}
	var startAllEmentChecked=function(list){
		for(var i=0;i<list.length;i++){
			if(!list[i].checked){
				return {value:"all",txt:"全选",checked:false};
			}
		}
		return {value:"all",txt:"全选",checked:true};
	}
	
	$.fn.ui_select=function(opts){
		var defaults={
			all:false,//是有有全选项
			search:true,//是否有搜索框
			zIndex:100,
			enableEmpty:false,//是否允许为空
			start:function(){},
			checked:function(){//选中回调
				
			},
			stop:function(){//选完回调
				
			},
			list:[{value:1,txt:"默认选中",checked:true},{value:2,txt:"测试2"},{value:3,txt:"测试3"},{value:4,txt:"测试4"}]
		};
		return this.each(function(index){
			var obj=$(this);
			var tagName=obj[0].tagName.toLowerCase();
			opts=$.extend({},defaults,opts);
			if(opts.all){
				opts.list.unshift(startAllEmentChecked(opts.list));
			}
			if(!obj.data("list")){
				obj.css({"padding-right":"25px","width":(obj.outerWidth()-20)+"px"});
			}
			if(tagName=="input"){
				obj.data("list",opts.list);
			}else if(tagName=="select"){
				obj=ifSelectTag(obj,opts.all);
			}else{
				return;
			}
			obj.attr("readonly","readonly");
			if(opts.enableEmpty){
				var nextObj=obj.next(".ui-select-slide-empty-btn");
				nextObj.length>0?nextObj.remove():null;
				var emptyBtn=$("<span class='ui-select-slide-empty-btn'>x</span>");
				obj.after(emptyBtn);
				emptyBtn.click(function(e){
					$(this).prev().val("");
					$(".ui-select-slide-checkbox:checked").prop("checked",false);
					changeList(obj);
					e.stopPropagation();
				});
			}
			
			inputConChange(obj);
			if(obj.data("clickEvent")){
				return;
			}
			obj.data("clickEvent",true);
			obj.click(function(e){
				$(".ui-select-slide-box").remove();
				stopMeth=opts.stop;
				slideHtml($(this),opts.search,opts.zIndex,opts.enableEmpty);
				e.stopPropagation();
			});
		});
	};
})(jQuery);
