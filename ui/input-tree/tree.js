(function($){
	/**
	 * <div class="ui-tree-child">
						<div class="ui-tree-title">
							<span class="ui-tree-icon ui-tree-icon-show"></span><label class="ui-tree-text">第三层</label>
						</div>
						<div class="ui-tree-child">
							<div class="ui-tree-title">
								<label class="ui-tree-text">第四层1</label>
							</div>
							<div class="ui-tree-title">
								<label class="ui-tree-text">第四层2</label>
							</div>
							<div class="ui-tree-title">
								<label class="ui-tree-text">第四层3</label>
							</div>
						</div>
					</div>
	 * 
	 */
	var makeTreeHtmlByTreeData=function(id,text,html,treeData,open){
			var len=treeData.length;
			if(open){
				html+='<div class="ui-tree-child" style="display:block">';	
			}else{
				html+='<div class="ui-tree-child" style="display:none;>';
			}
			//html+='<div class="ui-tree-child" style="display:block">';	
			for(var i=0;i<len;i++){
				html+='<div class="ui-tree-title">';
				//$("body").append("<p>"+treeData[i].text+"</p>");
				if(treeData[i].children&&treeData[i].children.length>0){
					if(treeData[i].open){
						html+='<span class="js-ui-tree-icon ui-tree-icon ui-tree-icon-show"></span>';
					}else{
						html+='<span class="js-ui-tree-icon ui-tree-icon ui-tree-icon-hide"></span>';
					}
					//html+='<span class="js-ui-tree-icon ui-tree-icon ui-tree-icon-hide"></span>';
				}
				html+='<label class="ui-tree-text">'+treeData[i][text]+'</label>';
				html+='</div>';
				if(treeData[i].children&&treeData[i].children.length>0){
					html=arguments.callee(id,text,html,treeData[i].children,treeData[i].open);
				}
			}
			html+='</div>';
			return html;
	};
	
	var appendNode=function(data){
		console.log(data);
		var html="";
		html+='<div class="ui-tree-child" style="display:none;">';
		var len=data.length;
		for(var i=0;i<len;i++){
			html+='<div class="ui-tree-title">';
			if(data[i].children){//有子节点
				html+='<span class="ui-tree-icon ui-tree-icon-hide"></span>';	
			}else{
				//html+='<span class="ui-tree-icon ui-tree-icon-show"></span>';
				//html+='<span class="ui-tree-icon ui-tree-icon-show"></span>';
			}
			
			html+='<span class="ui-tree-text">'+data[i].text+'</span>';
			html+='</div>';
		}
		html+='</div>';
		return html;
		//obj.closest(".ui-tree-title").after(html);
	};
	
	$.fn.ui_tree=function(opt){
		//var html=makeTreeHtmlByTreeData(opt.id,opt.text,"",opt.data,true);
		//console.log(html);
		var objBox=$(this);
		var html=appendNode(opt.data);
		//console.log(html);
		objBox.html(html);
		$(".ui-tree-child",objBox).slideDown();
		objBox.on("click",".ui-tree-title",function(){
			var obj=$(this);
			objBox.find(".active").removeClass("active");
			obj.addClass("active");
		}).on("click",".ui-tree-icon",function(e){
			var obj=$(this);
			if(obj.is(".ui-tree-icon-hide")){//开始 show
				var objTitle=obj.closest(".ui-tree-title");
				var childDom=objTitle.next(".ui-tree-child");
				if(childDom.length>0){//有子节点dom
					obj.removeClass("ui-tree-icon-hide").addClass("ui-tree-icon-show");
					childDom.slideDown();
				}else{//没有子节点dom
					opt.getChild(childDom,function(data){
						objTitle.after(appendNode(data)).next().slideDown();
						obj.removeClass("ui-tree-icon-hide").addClass("ui-tree-icon-show");
					});
				}
			}else{//开始 hide
				obj.removeClass("ui-tree-icon-show").addClass("ui-tree-icon-hide");
				obj.closest(".ui-tree-title").next(".ui-tree-child").slideUp();
			}
			e.stopPropagation();
		});
	};
})(jQuery);
