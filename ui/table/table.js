(function($) {
	//影藏按钮html
	var hidenBtn = "<input class='ui-table-column-hidebtn' type='button' value='x' />";
	//显示按钮html
	var showBtn = function(index, name) {
		return "<div class='ui-table-column-showbtn' index=" + index + ">" + name + "</div>";
	};
	var startHtml = function(objTable, columns, index) {
		$("tr", objTable).each(function() {
			$(this).children().eq(index).fadeOut("fast");
		});
		var showBtnHtml = showBtn(index, columns[index]);
		var objShowBtn = $(showBtnHtml);
		$("caption",objTable).append(objShowBtn);
		objShowBtn.click(function() {
			var i = $(this).attr("index");
			$("tr", objTable).each(function() {
				$(this).children().eq(i).fadeIn("slow");
			});
			$(this).remove();
		});
	};

	$.fn.ui_table = function() {
		this.each(function() {
			var objTable = this;
			if($("caption", objTable).length == 0) {
				objTable.prepend("<caption></caption>");
			}
			var columns = [];
			$("tr:first", objTable).children().each(function(index) {
				var objTd = $(this).addClass("ui-table-column-switch");
				columns.push($.trim(objTd.html()));
				var objHidenBtn = $(hidenBtn);
				objTd.append(objHidenBtn);
				objHidenBtn.click(function() {
					var showCount = $("tr", objTable).eq(0).find(".ui-table-column-switch:visible").length;
					if(showCount <= 1) {
						return;
					}
					startHtml(objTable, columns, index);
				});
				var display = objTd.attr("display");
				if(display && display == "none") {
					startHtml(objTable, columns, index);
				}

			});
		});
	}
})(jQuery);