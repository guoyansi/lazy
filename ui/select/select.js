(function($){
	var list=[];
	//生成option  html
	var optionHtml=function(obj){
		var len=list.length;
		var html="";
		var searchStr=$(".ui-select-slide-search").val();
		searchStr?"":searchStr="";
		//var values=obj.attr("values");
		//values=values?values.split(","):[];
		//var len1=values.length;
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
			html+="<input class='ui-select-slide-checkbox' type='checkbox' "+checked+" value='"+list[i].value+"' txt='"+list[i].txt+"' />"+list[i].txt;
			html+="</p>";		
		}
		return html;
	}
	//单击选项
	var clickOption=function(obj,targetValue,opts){
		if(targetValue=="all"){//单击的是所有
			if($(".ui-select-slide-checkbox[value='all']").is(":checked")){
				$(".ui-select-slide-checkbox").prop("checked",true);
			}else{
				$(".ui-select-slide-checkbox").prop("checked",false);
			}
		}else{//单机的是其他
			if($(".ui-select-slide-checkbox:not(:checked)").length>0){
				$(".ui-select-slide-checkbox[value='all']").prop("checked",false);
			}
		}
		var values=[];
		var txts=[];
		$(".ui-select-slide-checkbox:checked").each(function(index){
			var checkSelf=$(this);
			txts.push(checkSelf.attr("txt"));
			values.push(checkSelf.val());
		});
		obj.val(txts.join(",")).attr("values",values.join(","));
		var len=opts.list.length;
		var len1=values.length;
		for(var i=0;i<len;i++){
			opts.list[i].checked=false;
			for(var j=0;j<len1;j++){
				if(opts.list[i].value==values[j]){
					opts.list[i].checked=true;
					break;
				}
			}
		}
	};
	
	var slideHtml=function(obj,opts){
		var offset=obj.offset();
		var left=offset.left;
		var top=offset.top;
		var h=obj.outerHeight();
		var html="";
		html+="<div class='ui-select-slide-box' style='left:"+left+"px;top:"+(top+h+1)+"px;z-index:"+opts.zIndex+"'>";
		if(opts.search){
			html+="<div class='ui-select-slide-search-box'>";
			html+="<input class='ui-select-slide-search' placeholder='模糊搜索' />";
			html+="</div>";
		}
		html+="<div class='ui-select-slide-con-box'>";
		html+=optionHtml(obj);
		html+="</div>";
		html+="</div>";
		$("body").append(html);
		
		$(".ui-select-slide-box").click(function(e){
			e.stopPropagation();
		}).on("click",".ui-select-slide-con-item",function(){
			var self=$(".ui-select-slide-checkbox",this);
			var checked=self.prop("checked");
			self.prop("checked",!checked);
			clickOption(obj,self.val(),opts);
		}).on("click",".ui-select-slide-checkbox",function(e){
			clickOption(obj,$(this).val(),opts);
			e.stopPropagation();
		});
		$(".ui-select-slide-search").keyup(function(){
			$(".ui-select-slide-con-box").html(optionHtml(obj));
		});
	}
	
	$(document).click(function(e){
		$(".ui-select-slide-box").remove();
	});
	$(window).resize(function(){
		$(".ui-select-slide-box").remove();
	});
	$.fn.ui_get_select=function(type){
		var vs=this.attr("values");
		vs=vs?vs.split(","):[];
		var ts=this.val();
		ts=ts?ts.split(","):[];
		if(vs.length>0&&vs[0]=="all"){
			vs.shift();
			ts.shift();
		}
		if(type=="value"){
			return vs;
		}else if(type=="txt"){
			return ts;
		}else{
			var len=vs.length;
			var res=[];
			for(var i=0;i<len;i++){
				res.push([vs[i],ts[i]]);
			}
			return res;
		}
	};
	$.fn.ui_select=function(opts){
		var defaults={
			all:false,
			search:true,
			zIndex:100,
			checked:function(){//选中回调
				
			},
			stop:function(){//选完回调
				
			},
			list:[{value:1,txt:"测试1",checked:true},{value:2,txt:"测试2"},{value:3,txt:"测试3"},{value:4,txt:"测试4"}]
		};
		this.attr("readonly","readonly");
		return this.each(function(index){
			var obj=$(this);
			var tagName=obj[0].tagName.toLowerCase();
			opts=$.extend({},defaults,opts);
			if(tagName=="input"){
				
			}else if(tagName=="select"){
				var myList=[];
				opts.list=[];
				var selected=false;
				$("option",obj).each(function(){
					var self=$(this);
					opts.list.push({value:self.val(),txt:self.html(),checked:self.attr("selected")?true:false});
				});
				var clsNmae=obj.attr("class");
				var idName=obj.attr("id");
				var newObj=$("<input id='"+(idName?idName:'')+"' class='"+(clsNmae?clsName:'')+"' />");
				obj.replaceWith(newObj);
				obj=newObj;
			}else{
				return;
			}
			if(obj.data("exce")){
				return;
			}else{
				obj.data("exce",true);
				obj.css({"padding-right":"25px","width":(obj.width()-20)+"px"})
			}
			//.after("<span class='ui-select-slide-empty-btn'>x</span>");
			var nextObj=obj.next(".ui-select-slide-empty-btn");
			if(nextObj.length>0){
				
			}else{
				var emptyBtn=$("<span class='ui-select-slide-empty-btn'>x</span>");
				obj.after(emptyBtn);
				emptyBtn.click(function(){
					$(this).prev().val("").removeAttr("values");
					for(var p=0;p<opts.list.length;p++){
						opts.list[p].checked=false;
					}
				});
			}
			obj.click(function(e){
				$(".ui-select-slide-box").remove();
				list=opts.list;
				if(opts.all&&!obj.data("all")){
					list.unshift({value:"all",txt:"全选"});
					obj.data("all",true);
				}
				slideHtml($(this),opts);
				e.stopPropagation();
			}).mouseenter(function(){
				
			}).mouseleave(function(){
				
			});
		});
	};
})(jQuery);
