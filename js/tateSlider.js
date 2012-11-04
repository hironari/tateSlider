(function($){
	$.fn.extend({
		tateSlider : function(options){
			var defaults = {
				interval : 2000,
				duration : 800,
				itemHeight : 481,
				mouseWheel : false
			};
			
			var options = $.extend(defaults, options);
		
			return this.each(function(){
				
				var o = options;
				var interval = o.interval;
				var duration = o.duration;
				var mouseWheel = o.mouseWheel;
				var itemHeight = o.itemHeight;
				var listlength = $("#nav > li").size();
				var lists = $("#nav > li").find("a");
				var index = 0;
				lists.eq(index).closest("li").addClass("active");
		
				selectNav = function(idx){
					lists
						.closest("li")
						.removeClass("active")
						.eq(idx)
						.addClass("active");
						index = idx;
				}
		
				slideImg = function(idx){
					$("#tate")
						.stop()
						.animate({"top": itemHeight*idx*-1+"px", "left": 0+"px"}, {queue: true, duration: duration, easing: "swing"});
					index = idx;
				}
				
				startCycle = function(){
					var cycle = setInterval(function(){
						var idx = index < listlength-1 ? index+1 : 0;
						slideImg(idx);
						selectNav(idx);
					}, interval);
					
				};
				startCycle();				
				
				lists.bind("click", function(e){
					e.preventDefault();
					var idx = lists.index(this);
					if(index === idx){
						return;
					}
					slideImg(idx);
					selectNav(idx);
				})
				.eq(0)
				.closest("li")
				.addClass("active");
				
				if(mouseWheel){
					$(window).bind("mousewheel",function(event,delta){
					  switch(delta){
    					case 1:
      					//ホイールを上に回転させた場合
			           	var idx = idx - 1;
			           	slideImg(idx);
			           	selectNav(idx);
            			break;
    					case -1:
      					//ホイールを下に回転させた場合
      					var idx = idx + 1;
      					slideImg(idx);
      					selectNav(idx);
            			break;
 					  }
					});
				 }
				
			});
		}
	});
})(jQuery);
