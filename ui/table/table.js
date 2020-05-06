(function($) {

	var defaults = {
		heads: [], //表头信息，支持复杂表头
		unPxDatas: [], //不排序的数据
		columns: [], //列信息
		list: [] //参与排序的数据
	};

	$.fn.ui_table = function(opts) {
		if(opts=="eventPx"){
			eventPx(this,this.data("opts"));
			return this;
		}
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
		var lastRows = heads.pop();;
		var rowspan = 1;
		var colspan = 1;
		heads.forEach(function(row, index, arr) {
			html += "<tr class='kb-table-tr kb-table-head-tr'>";
			row.forEach(function(elemt, index2, arr2) {
				rowspan = elemt.rowspan ? elemt.rowspan : 1;
				colspan = elemt.colspan ? elemt.colspan : 1;
				html += "<td colspan='" + colspan + "' rowspan='" + rowspan + "' class='kb-table-td'>";
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
			});
			html += "</tr>";
		});

		html += "<tr class='kb-table-tr kb-table-head-tr'>";
		for(i = 0; i < lastRows.length; i++) {
			if(lastRows[i].colspan && lastRows[i].colspan != 1) {
				throw new Error("heads数组最后一项不能出现合并单元格");
				return;
			}
			var isPx = "kb-table-td-px";
			if(!lastRows[i].px) {
				isPx = "";
			}
			html += "<td class='js-click-px kb-table-td " + isPx + "' k='" + lastRows[i].key + "'>";
			if(lastRows[i].callback) {
				var res = lastRows[i].callback(lastRows[i].name, lastRows[i]);
				if(isTrue(res)) {
					html += getTdCon(res, lastRows[i].clazz);
				} else {
					html += getTdCon(lastRows[i].name, lastRows[i].clazz);
				}
			} else {
				html += getTdCon(lastRows[i].name, lastRows[i].clazz);
			}
			if(isTrue(isPx)) {
				html += "<span class='kb-table-px kb-table-px-up'></span>";
				html += "<span class='kb-table-px kb-table-px-down'></span>";
			}
			html += "</td>";
		}
		html += "</tr>";
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
		$(".js-click-px").click(function() {
			var index=$(this).index();
			var pxItem = $(".js-click-px",obj).eq(index);
			pxItem.siblings().removeClass("up").removeClass("down");
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
			//var col = opts.column;
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
			$(".js-px-tr").remove();
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