(function($){
	$.fn.ui_freeze=function(freeze){
		if(freeze==="clear"){
			var elIndex=this.data("elIndex");
			$(".js-freeze-div-"+elIndex).remove();
			return this;
		}else if(freeze=="reset"){
			var elIndex=this.data("elIndex");
			$(".js-freeze-div-"+elIndex).remove();
			makeFreeze($(this),this.data("freeze"),elIndex);
			return this;
		}else if(!freeze instanceof Array){
			throw new Error("参数有误");
			return;
		}
		return this.each(function(elIndex){
			var obj=$(this).css({overflow:"auto"}).data("elIndex",elIndex).data("freeze",freeze);
			makeFreeze(obj,freeze,elIndex,0,0);
			var sl=0,st=0;
			obj.scroll(function(){
				sl=$(this).scrollLeft();
				st=$(this).scrollTop();
				$(".js-freeze-top-div-"+elIndex).scrollLeft(sl);
				$(".js-freeze-left-div-"+elIndex).scrollTop(st);
			});
		});
	}
	
	function makeFreeze(obj,freeze,elIndex){
		var boxAttr=getBoxAttr(obj);
		var objTable=$("table",obj);
		objTable.width(boxAttr.tableW).height(boxAttr.tableH);
		var bgcolor=obj.css("backgroundColor");
		//bgcolor="red";
		var groupFreeze=freeze.map(function(el){
			if(el!=0){
				return "X";
			}
			return el;
		}).join("");
		if(groupFreeze==="X000"){//冻结top
			//objTable=$("table",obj);
			groupX000(obj,objTable,freeze[0],bgcolor,elIndex,boxAttr);
		}else if(groupFreeze==="000X"){//冻结left
			//objTable=objTable==null?$("table",obj):objTable;
			group000X(obj,objTable,freeze[3],bgcolor,elIndex,boxAttr);
		}else if(groupFreeze==="X00X"){//冻结top和left
			//objTable=objTable==null?$("table",obj):objTable;
			groupX00X(obj,objTable,freeze[0],freeze[3],bgcolor,elIndex,boxAttr);
		}else{
			throw new Error("暂时还不支持的冻结方式")
		}
	}
	
	
	/*function setTableSize(obj){
		return $("table",obj).width();
	}
	function setTableSize(obj){
		return $("table",obj).width();
	}*/
	
	//冻结top
	function groupX000(obj,objTable,rows,bgcolor,elIndex,boxAttr){
		cloneTableTop(obj,objTable,rows,bgcolor,elIndex,boxAttr);
	}
	
	//冻结left
	function group000X(obj,objTable,columns,bgcolor,elIndex,boxAttr){
		cloneTableLeft(obj,objTable,columns,bgcolor,elIndex,boxAttr);
	}
	
	//冻结top,left
	function groupX00X(obj,objTable,rows,columns,bgcolor,elIndex,boxAttr){
		var h=cloneTableTop(obj,objTable,rows,bgcolor,elIndex,boxAttr);
		var w=cloneTableLeft(obj,objTable,columns,bgcolor,elIndex,boxAttr);
		cloneTableTopLeft(obj,objTable,w,h,bgcolor,elIndex,boxAttr);
	}
	
	
	//克隆top
	function cloneTableTop(obj,objTable,rows,bgcolor,elIndex,boxAttr){
		var height=0;
		var tdJson={};
		$("tr",objTable).each(function(index){
			if(index+1>rows){
				return true;
			}
			$("td",this).each(function(index2){
				var rowspan=$(this).attr("rowspan");
				rowspan=rowspan?Number(rowspan):1;
				if(tdJson[index2]){
					tdJson[index2].push(rowspan);
				}else{
					tdJson[index2]=[rowspan];
				}
			});
		});
		
		var res=true;
		var rightColumn=0;//合适的列
		for(var k in tdJson){
			res=tdJson[k].every(function(v){
				return v==1;
			});
			if(res){
				rightColumn=k;
				break;
			}
		}
		
		
		var objTr=$("tr",objTable);
		for(var i=0;i<rows;i++){
			height+=objTr.eq(i).find("td").eq(rightColumn).outerHeight();
		}
		height++;
		var jsonCss={
			overflow:"hidden",
			width:(boxAttr.boxW-boxAttr.scrollW)+"px",
			height:height+"px",
			position:"absolute",
			top:boxAttr.top+"px",
			left:boxAttr.left+"px",
			backgroundColor:bgcolor
		};
		var objDiv=$("<div class='js-freeze-div-"+elIndex+" js-freeze-top-div-"+elIndex+"'></div>");
		objDiv.append(objTable.prop("outerHTML"));
		objDiv.css(jsonCss);
		$("body").append(objDiv);
		
		objDiv.scrollLeft(boxAttr.scrollLeft);
		return height;
	}
	
	function cloneTableRight(obj,objTable,columns){
		throw new Error("暂未开发右侧冻结")
	}
	
	function cloneTableBottom(obj,objTable,rows){
		throw new Error("暂未开发底部冻结")
	}
	
	//克隆left
	function cloneTableLeft(obj,objTable,columns,bgcolor,elIndex,boxAttr,scrollTop){
		var colspan;
		var totalColspan=0;
		var objTr=null;
		$("tr",objTable).each(function(index){
			totalColspan=0;
			$("td",this).each(function(index2){
				var colspan=$(this).attr("colspan");
				if(!colspan){
					colspan=1;
				}
				if(index2+1>columns&&totalColspan==columns){
					objTr=$("tr",objTable).eq(index-1);
					return true;
				}
				totalColspan+=Number(colspan);
			});
			if(objTr!=null){
				return true;
			}
		});
		if(objTr==null){
			throw new Error("左冻结列数大于总列数，无法冻结。")
			return 0;
		}
		var width=0;
		for(var i=0;i<columns;i++){
			width+=$("td",objTr).eq(i).outerWidth();
		}
		width++;
		var jsonCss={
			overflow:"hidden",
			width:width+"px",
			height:(boxAttr.boxH-boxAttr.scrollH)+"px",
			position:"absolute",
			top:boxAttr.top+"px",
			left:boxAttr.left+"px",
			backgroundColor:bgcolor
		};
		var objDiv=$("<div class='js-freeze-div-"+elIndex+" js-freeze-left-div-"+elIndex+"'></div>");
		objDiv.append(objTable.prop("outerHTML"));
		objDiv.css(jsonCss);
		$("body").append(objDiv);
		objDiv.scrollTop(boxAttr.scrollTop);
		return width;
	}
	//克隆左上角
	function cloneTableTopLeft(obj,objTable,w,h,bgcolor,elIndex,boxAttr){
		var jsonCss={
			overflow:"hidden",
			width:w+"px",
			height:h+"px",
			position:"absolute",
			top:boxAttr.top+"px",
			left:boxAttr.left+"px",
			backgroundColor:bgcolor
		};
		var objDiv=$("<div class='js-freeze-div-"+elIndex+" js-freeze-left-top-div-"+elIndex+"'></div>");
		objDiv.append(objTable.prop("outerHTML"));
		objDiv.css(jsonCss);
		$("body").append(objDiv);
	}
	
	/*function setCloneTdSize(cloneDivObj,tdJsonSize){
		$("table tr",cloneDivObj).each(function(index){
			$("td",this).each(function(index2){
				$(this).width(tdJsonSize[index+"-"+index2].w).height(tdJsonSize[index+"-"+index2].h);
			});
		});
	}*/
	
	function getBoxAttr(obj){
		var offset=obj.offset();
		var left=offset.left;
		var top=offset.top;
		var scrollLeft=$(window).scrollLeft();
		var scrollTop=$(window).scrollTop();
		var boxW=obj.width();
		var boxH=obj.height();
		var objTable=obj.find("table");
		var tableW=objTable.width();
		var tableH=objTable.height();
		
		var scrollCurrentLeft=obj.scrollLeft();//滚动条当前位置
		var scrollCurrentTop=obj.scrollTop();//滚动条当前位置
		
		obj.scrollLeft(10000000000).scrollTop(10000000000);//临时设置到最大
		var xScroll=true;
		var yScroll=true;
		var scrollFactLeft=obj.scrollLeft();//滚动条实际最大值
		var scrollFactTop=obj.scrollTop();//滚动条实际最大值
		var conW=objTable.outerWidth(true);//实际内容宽度
		var conH=objTable.outerHeight(true);//实际内容高度
		var scrollW=Math.abs(conW-boxW-scrollFactLeft);//滚动条本身宽度
		var scrollH=Math.abs(conH-boxH-scrollFactTop);//滚动条本身高度
		obj.scrollLeft(scrollCurrentLeft).scrollTop(scrollCurrentTop);//恢复位置
		
		return {left:scrollLeft+left,top:scrollTop+top,boxW:boxW,boxH:boxH,tableW:tableW,tableH:tableH,scrollW:scrollW,scrollH:scrollH,scrollLeft:scrollCurrentLeft,scrollTop:scrollCurrentTop};
		
	}
	
	function checkAndGetParam(opts){
		var jsonCss={"-webkit-overflow-scrolling":"touch;"};
		jsonCss.position="absolute";
		jsonCss.overflow="auto";
		if(isTrue(opts.top)){
			jsonCss.top=isContain(opts.top,"%")?opts.top:opts.top+"px";
		}
		if(isTrue(opts.left)){
			jsonCss.left=isContain(opts.left,"%")?opts.left:opts.left+"px";
		}
		if(isTrue(opts.right)){
			jsonCss.right=isContain(opts.right,"%")?opts.right:opts.right+"px";
		}
		if(isTrue(opts.bottom)){
			jsonCss.bottom=isContain(opts.bottom,"%")?opts.bottom:opts.bottom+"px";
		}
		if(isTrue(opts.width)){
			jsonCss.width=isContain(opts.width,"%")?opts.width:opts.width+"px";
		}
		if(isTrue(opts.height)){
			jsonCss.height=isContain(opts.height,"%")?opts.height:opts.height+"px";
		}
		jsonCss.zIndex=opts.zIndex;
		
		return jsonCss;
	}
	function isContain(str,word){
		return (str+"").indexOf(word)>-1?true:false;
	}
	
	function isTrue(v){
		 return (v+"").length!=0?true:false;
	}
	function isString(v){
		if(typeof(v)=="string"){
			return true;
		}
		return false;
	}
	
	function isJson(v){
		return typeof(v) == "object" && Object.prototype.toString.call(v).toLowerCase() == "[object object]" && !v.length;
	}
	function checkFreeze(obj){
		
	}
	
})(jQuery);
