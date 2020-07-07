(function($) {

	var defaults = {
		heads: [], //表头信息，支持复杂表头
		unPxDatas: [], //不排序的数据
		unPxDatasFun:{},
		columns: [], //列信息
		list: [], //参与排序的数据
		listFun:{}
	};

	$.fn.ui_table = function(opts) {
		/*if(opts=="eventPx"){
			eventPx(this,this.data("opts"));
			return this;
		}*/
		opts = $.extend({}, defaults, opts);
		return this.each(function(index) {
			var obj = $(this);
			//var lastHead = getHeadKeys(opts.heads);
			if(!isTrue(opts.keys)|| !Array.isArray(opts.keys) || opts.keys.length==0){
				throw new Error("请合理填写keys参数");
				return;
			}
			var html = "";
			html += "<table class='kb-table'>";
			html += getHeadHtml(opts.heads);
			html += getUnPxDatasHtml(opts.unPxDatas,opts.keys, opts.unPxDatasFun);
			html += getListHtml(opts.list,opts.keys, opts.listFun);
			html += "</table>";
			obj.html(html);
			obj.data("opts",opts);
			eventPx(obj,opts);
		});
	};
	
	function getHeadKeys(heads){
		var lastHeads=[];
		heads.forEach(function(row,index,arr){
			row.forEach(function(td,index2,arr2){
				if(isTrue(td.key)){
					lastHeads.push(td);
				}
			});
		});
		return lastHeads;
	}

	function getListHtml(list, keys, listFun) {
		var html = "";
		list.forEach(function(elemt, index, arr) {
			html += "<tr class='js-px-tr kb-table-tr'>";
			html += getRowTdHtml(elemt, keys, listFun);
			html += "</tr>";
		});
		return html;
	}

	function getUnPxDatasHtml(unPxDatas, keys, unPxDatasFun) {
		var html = "";
		unPxDatas.forEach(function(elemt, index, arr) {
			html += "<tr class='kb-table-tr'>";
			html += getRowTdHtml(elemt, keys, unPxDatasFun);
			html += "</tr>";
		});
		return html;
	}

	function getRowTdHtml(elemt, keys, fun) {
		var html = "";
		keys.forEach(function(elemt2, index2, arr2) {
			html += "<td class='kb-table-td'>";
			if(fun[elemt2 + "Callback"]) {
				var res = fun[elemt2 + "Callback"](elemt[elemt2], elemt);
				if(isTrue(res)) {
					html += getTdCon(res, elemt.clazz);
				} else {
					html += getTdCon(elemt[elemt2], elemt.clazz);
				}
			} else {
				html += getTdCon(elemt[elemt2], elemt.clazz);
			}
			html += "</td>";
		});
		return html;
	}

	function getTdCon(v, clazz) {
		clazz = clazz ? clazz : "kb-td-text";
		return "<div class='" + clazz + "'>" + v + "</div>";
	}

	function getHeadHtml(heads) {
		var html = "";
		//var lastRows = heads[heads.length-1];
		var rowspan = 1;
		var colspan = 1;
		var key="";
		heads.forEach(function(row, index, arr) {
			/*if(index==heads.length-1){
				return true;
			}*/
			
			html += "<tr class='kb-table-tr kb-table-head-tr'>";
			row.forEach(function(elemt, index2, arr2) {
				rowspan = elemt.rowspan ? elemt.rowspan : 1;
				colspan = elemt.colspan ? elemt.colspan : 1;
				key=elemt.key?elemt.key:"-";
				var isPx = "kb-table-td-px";
				if(!elemt.px) {
					isPx = "";
				}
				html += "<td colspan='" + colspan + "' rowspan='" + rowspan + "' class='js-click-px kb-table-td " + isPx + "' k='" + key + "' clickEvent='n'>";
				//html += "<td colspan='" + colspan + "' rowspan='" + rowspan + "' class='kb-table-td'>";
				if(elemt.callback) {
					var res = elemt.callback(elemt.name, elemt);
					if(isTrue(res)) {
						html += getTdCon(res, elemt.clazz);
					} else {
						html += getTdCon(elemt.name, elemt.clazz);
					}
				} else {
					html += getTdCon(elemt.name, elemt.clazz);
				}
				if(isTrue(isPx)) {
					html += "<span class='kb-table-px kb-table-px-up'></span>";
					html += "<span class='kb-table-px kb-table-px-down'></span>";
				}
				html += "</td>";
			});
			html += "</tr>";
		});
		return html;
	}

	function isTrue(v) {
		if(typeof(v) == "undefined") {
			return false;
		}
		if((v + "").length == 0) {
			return false;
		}
		return true;
	}

	function eventPx(obj,opts) {
		//给单元格添加index标识
		$("td",obj).each(function(index){
			var self=$(this);
			if(self.is(".kb-table-td-px")){
				self.attr("clickIndex",index);
			}
		});
		
		$(".js-click-px",obj).click(function() {
			var objPx=$(this);
			if(!objPx.is(".kb-table-td-px")){
				return;
			}
			var index=objPx.index();
			var pxItem = objPx;
			$(".js-click-px.kb-table-td-px",obj).not(pxItem).removeClass("up").removeClass("down");
			var fx = 1;
			if(!pxItem.is(".up") && !pxItem.is(".down")) {
				pxItem.addClass("up");
				fx = 1;
			} else if(pxItem.is(".up")) {
				pxItem.removeClass("up");
				pxItem.addClass("down");
				fx = 2;
			} else if(pxItem.is(".down")) {
				pxItem.removeClass("down");
				pxItem.addClass("up");
				fx = 1;
			}
			var k = pxItem.attr("k");
			var ls = 0;
			var list = opts.list;
			var len = list.length;
			
			if(fx == 1) { //从小到大
				list.sort(function(a, b) {
					return asc(a[k], b[k]);
				});
			} else { //从大到小
				list.sort(function(a, b) {
					return desc(a[k], b[k]);
				});
			}
 			var html=getListHtml(list,opts.keys, opts.listFun);
			$(".js-px-tr",obj).remove();
			$("tbody", obj).append(html);
			if(opts.pxCallback){
				opts.pxCallback(k);
			}
		});
	}

	function asc(a, b) { //升序
		if(isNaN(a) || isNaN(b)) {
			return 0;
		}
		if(Number(a) < Number(b)) {
			return -1;
		} else if(Number(a) > Number(b)) {
			return 1;
		} else {
			return 0;
		}
	}

	function desc(a, b) { //降序
		if(isNaN(a) || isNaN(b)) {
			return 0;
		}
		if(Number(a) > Number(b)) {
			return -1;
		} else if(Number(a) < Number(b)) {
			return 1;
		} else {
			return 0;
		}
	}

})(jQuery);