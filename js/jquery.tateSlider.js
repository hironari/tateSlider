/*Copyright© 2012 katsew All Rights Reserved.
 * 以下に定める条件に従い、本ソフトウェアおよび関連文書のファイル（以下「ソフトウェア」）の複製を取得する
 * すべての人に対し、ソフトウェアを無制限に扱うことを無償で許可します。これには、ソフトウェアの複製を使用、
 * 複写、変更、結合、掲載、頒布、サブライセンス、および/または販売する権利、およびソフトウェアを提供する相
 * 手に同じことを許可する権利も無制限に含まれます。
 * 上記の著作権表示および本許諾表示を、ソフトウェアのすべての複製または重要な部分に記載するものとします。
 * ソフトウェアは「現状のまま」で、明示であるか暗黙であるかを問わず、何らの保証もなく提供されます。ここで
 * いう保証とは、商品性、特定の目的への適合性、および権利非侵害についての保証も含みますが、それに限定され
 * るものではありません。 作者または著作権者は、契約行為、不法行為、またはそれ以外であろうと、ソフトウェア
 * に起因または関連し、あるいはソフトウェアの使用またはその他の扱いによって生じる一切の請求、損害、その他の
 * 義務について何らの責任も負わないものとします。
 * 
 */

(function($){
	$.fn.extend({
		tateSlider : function(options){
			var defaults = {
				autoPlay : true,
				interval : 2000,
				duration : 800,
				itemHeight : 481,
				hoverPause : true,
				mouseWheel : false
			};
			
			var options = $.extend(defaults, options);
		
			return this.each(function(){
				
				var o = options;
				var interval = o.interval;
				var duration = o.duration;
				var mouseWheel = o.mouseWheel;
				var autoPlay = o.autoPlay;
				var hoverPause = o.hoverPause;
				var itemHeight = o.itemHeight;
				var listlength = $("#nav > li").size();
				var lists = $("#nav > li").find("a");
				var index = 0;
				var cycle;
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
				
				if(autoPlay){
					startCycle = function(){
						cycle = setInterval(function(){
							var idx = index < listlength-1 ? index+1 : 0;
							slideImg(idx);
							selectNav(idx);
						}, interval);
					
					};
					startCycle();
				};				
				
				restartCycle = function(){
					if(autoPlay){
						clearInterval(cycle);
						startCycle();
					}
				};
				
				if(hoverPause){
					$(this).hover(function(){
						clearInterval(cycle);
					}, function(){
						restartCycle();
					});
					
					lists.hover(function(){
						clearInterval(cycle);
					}, function(){
						restartCycle();
					});
				}				
				
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
