(function($) {

	var defaults = {
			active: 1, //激活项。这个参数不传，默认为1
			wordWrap: false, //true表示tab标题自动换行（默认值），false不换行
			tabs: [
					{
						name: "一个非常长的tabname1234567890",
						clickEvent: function() {
							alert("tab1");
						}
					},
					{
						name: "一个非常长的tabname1234567890",
						clickEvent: function() {
							alert("tab2");
						}
					},
					{
						name: "一个非常长的tabname1234567890",
						clickEvent: function() {
							alert("tab3");
						}
					}
			]
		};

	$.fn.kb_tab = function(opts) {
		var getTabHtml = function(opts) {
			//var len = Object.keys(opts.tabs).length;
			var len=opts.tabs.length;
			if(len <= 1) {
				return "";
			}
			var html = "";
			html += "<div class='js-kb-tab kb-tab'>"; //kb-tab-" + len + "'
			html += "<div class='kb-tab-item-scroll' style='-webkit-overflow-scrolling: touch;'>";
			/*for(var k in opts.tabs) {
				html += "<div class='js-click-tab-item kb-tab-item " + (i == opts.active ? 'active' : '') + "' tab='" + i + "'><div class='kb-tab-item-txt'>" + k + "</div></div>";
				i++;
			}*/
			opts.tabs.forEach(function(elemt,index){
				html += "<div class='js-click-tab-item kb-tab-item " + (index == opts.active ? 'active' : '') + "' tab='" + index + "'><div class='kb-tab-item-txt'>" + elemt.name + "</div></div>";
			});
			html += "</div>";
			html += "</div>";
			return html;
		};

		var checkTabScroll = function(obj, wordWrap) {
			var tabObj = $(".js-kb-tab", obj);
			var totalTabW = 0;
			var activePosition = 0;
			var activeIsAdd = true;
			tabObj.find(".js-click-tab-item").each(function() {
				var self = $(this);
				var itemW = self.outerWidth(true);
				totalTabW += itemW;
				if(self.hasClass("active")) {
					activeIsAdd = false;
				}
				if(activeIsAdd) {
					activePosition += itemW;
				}
			});
			activePosition -= 40;
			if(totalTabW <= tabObj.width() || wordWrap) { //不满足自动换行条件
				var tabH = tabObj.outerHeight();
				tabObj.height(tabH).find(".kb-tab-item-txt").css({
					position: "absolute"
				}); //.find(".kb-tab-item-scroll").height(tabH).find(".kb-tab-item").height(tabH)
				var len = tabObj.find(".kb-tab-item").length;
				tabObj.addClass("kb-tab-" + len);
				tabObj.find(".kb-tab-item-txt").addClass("kb-tab-item-txt-wordWrap");
			} else { //tab过长，但是不自动换行
				tabObj.find(".kb-tab-item-scroll").width(totalTabW + 1);
				tabObj.scrollLeft(activePosition);
			}
		};
		opts = $.extend({}, defaults, opts);
		this.each(function(index) {
			var obj = $(this);
			var html = getTabHtml(opts);
			obj.html(html);
			checkTabScroll(obj, opts.wordWrap);
			$(".js-click-tab-item", obj).click(function() {
				var tabItem = $(this);
				if(tabItem.is(".active")) {
					return;
				}
				var tabIndex = tabItem.attr("tab");
				opts.tabs[tabIndex].clickEvent();
			});
		});
	
	
	}
})(jQuery);