/**ajax加载效果**/
(function($) {
	$.ui_load = function(opt) { //开始ajax
		var defaults={
			icon:1,//1:css旋转,2:gif动画,3:纯文字
			msg:"数据处理中..."
		};
		if($("#ui-load-shade").length>0){
			return;
		}
		if(typeof opt=="string"){
			defaults.msg=opt;
		}
		if(!opt.icon){
			opt.icon=0;
		}
		opt=$.extend({},defaults,opt);
		var html = "";
		html += "<div id='ui-load-shade'>";
		if(opt.icon==0){//纯文字
			html += "<div id='ui-load-box' class='ui-load-box-text'>";
		}else if(opt.icon==1){//css动画
			html += "<div id='ui-load-box' class='ui-load-box-css'>";
			html+="<span class='ui-load-box-img-css'></span>"
		}else if(opt.icon==2){//gif
			html += "<div id='ui-load-box' class='ui-load-box-img ui-load-box-img-gif'>";
		}
		html += "<div class='ui-load-text'>" + opt.msg + "</div>";
		html += "</div>";
		html += "</div>";
		$("body").append(html);
	}
	$.ui_load_close = function() { //结束ajax
		$("#ui-load-shade").remove();
	}

})(jQuery);

/**ajax加载效果end**/