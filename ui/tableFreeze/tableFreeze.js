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
		for(var i=0;i<freeze.length;i++){
			freeze[i]=Number(freeze[i]);
		}
		
		return this.each(function(elIndex){
			var obj=$(this).css({overflow:"auto"}).data("elIndex",elIndex).data("freeze",freeze);
			//setTableSize(obj);
			var r=makeFreeze(obj,freeze,elIndex);
			if(!r){
				return;
			}
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
		if(groupFreeze==="0000"){
			return false;
		}else if(groupFreeze==="X000"){//冻结top
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
		eventMove(obj,elIndex);
		return true;
	}
	
	//复制了html，对事件进行迁移
	function eventMove(obj,elIndex){
		$(".js-freeze-div-"+elIndex).find(".js-click-px.kb-table-td-px").click(function(){
			var clickIndex=$(this).attr("clickIndex");
			$("td[clickIndex="+clickIndex+"]",obj).trigger("click");
		});
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
	
	
	/**
	 * var table=new Table($("#table"),2);
		console.log(table.getAllTds());
		console.log(table.getShortTds());
		console.log(table.getFirstAllColumn());
	 * @param {Object} objTable
	 * @param {Object} rows 行号，从1开始
	 */
	function Table(objTable,limitRows){
		rowspan=function(td){
			var v=td.attr("rowspan");
			return v?Number(v):1;
		};
		colspan=function(td){
			var v=td.attr("colspan");
			return v?Number(v):1;
		};
		
		/**
		 * a a a - -
		 * - - a a a
		 * a - a - -
		 * 
		 * a表示td的jquery对象，-表示没有td
		 * 
		 * 用于模拟table表格中td的的布局
		 */
		
		var tds=[];
		var add=function(row,col,tdObj){
			if(!tds[row]){
				tds[row]=[];
			}
				while(tds[row][col]){
					col++;
				}
				tds[row][col]=tdObj;
		};
		var emptyElemt="-";
		$("tr",objTable).each(function(row){//行号
			if(limitRows&&row>limitRows-1){
				return false;
			}
			$("td",this).each(function(col){//列号
				var tdObj=$(this);
				var r=rowspan(tdObj);//跨行数
				var c=colspan(tdObj);//跨列数
				add(row,col,tdObj);
				for(var i=1;i<r;i++){
					add(row+i,col,emptyElemt);
				}
				for(i=1;i<c;i++){
					add(row,col+i,emptyElemt);
				}
			});
		});
		
		/**
		 * 获取完整的tds数据
		 */
		this.getAllTds=function(){
			return tds;
		}
		/**
		 * 获取受limitRows限制的行数据，因为受跨行的影响，
		 * 实际数据行数可能会比limitRows多，并且tds可能比实际的表格td少
		 */
		this.getShortTds=function(){
			return tds.slice(0,limitRows);
		}
		/**
		 * 获取指定列，index从0开始
		 */
		this.getColumn=function(index){
			var res=[];
			tds.forEach(function(arr){
				arr.forEach(function(td,col){
					if(index==col){
						res.push(td);
						return false;
					}
				});
			});
			return res;
		};
		
		/**
		 * 获取第一个受限制的完整列
		 */
		this.getFirstAllColumn=function(){
			var res=[];
			var n=0;//当前列
			var  newTds=tds.slice(0,limitRows);
			for(var i=0;i<newTds.length;i++){
				for(var j=0;j<newTds[i].length;j++){
					if(n==j){
						if(newTds[i][j]===emptyElemt){
							n++;
							i=-1;
							res=[];
						}else{
							res.push(newTds[i][j]);
						}
						break;
					}
				}
				if(res.length>=limitRows){
					break;
				}
			}
			return res;
		}
	}
	
	
	//克隆top
	function cloneTableTop(obj,objTable,rows,bgcolor,elIndex,boxAttr){
		var height=0;
		
		var table=new Table(objTable,rows);
		var tdArr=table.getFirstAllColumn();
		console.log(tdArr);
		tdArr.forEach(function(td,index){
			height+=td.outerHeight();
		});
		console.log("高："+height);
		/*var tdJson={};
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
		}*/
		height++;
		var jsonCss={
			overflow:"hidden",
			width:(boxAttr.boxW-boxAttr.scrollW)+"px",
			height:height+"px",
			position:"absolute",
			top:boxAttr.top+"px",
			left:boxAttr.left+"px",
			zIndex:1001,
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
			zIndex:1002,
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
			zIndex:1003,
			backgroundColor:bgcolor
		};
		var objDiv=$("<div class='js-freeze-div-"+elIndex+" js-freeze-left-top-div-"+elIndex+"'></div>");
		objDiv.append(objTable.prop("outerHTML"));
		objDiv.css(jsonCss);
		$("body").append(objDiv);
	}
	
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
