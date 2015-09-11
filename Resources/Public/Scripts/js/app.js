jQuery.noConflict();

(function($) {

	$(document).foundation({
	  offcanvas : {
		// Sets method in which offcanvas opens.
		// [ move | overlap_single | overlap ]
		open_method: 'overlap', 
		// Should the menu close when a menu link is clicked?
		// [ true | false ]
		close_on_click : false
	  }
	});
		
	$(document).ready(function() {
	
		
		
		
		var isMobile = function() {
			if ($('#navi:visible').length > 0) return true;
			return false;
		}
		
		$('body').addClass('js');
		/*
		$('#navi').click(function() {
			$('body').toggleClass('naviopen');
			return false;
			if  ($('body').hasClass('naviopen')) {
				$( "#mainnavi" ).animate({
					left: "0",
				}, 200, function() {
					// Animation complete.
				});
			}
			else {
				$( "#mainnavi" ).animate({
					left: "-200",
				}, 400, function() {
					// Animation complete.
				});
			}
		});

		$.aniNavi = function(val, time) {
			$('#mainnavi').animate({
				left: val,
			}, time, function(){
			});
		}
		
		$('#mainnavi li a').click(function() {
			if (!isMobile() || $(this).parent().children('ul').length == 0) return true;
			
			var time = 200;
			var navwidth = 200;
			
			//var level = $(this).parent().parentsUntil('#navhelper').length;
			var level = $(this).parents('ul').length;
			
			
			$(this).parent().children('ul').children('li.cloned').remove();
			var clone = $(this).parent().clone();
			clone.children('ul').remove();
			clone
				.addClass('active')
				.addClass('cloned')
				.attr('data-level', (level))
				.prependTo($(this).parent().children('ul'))
				.children('a').attr('href', '').unbind('click').click(function() {
					$('#mainnavi li.active').removeClass('active');
					$(this).parent().addClass('active');
					var l = (level+1)-$(this).parent().attr('data-level');
					$.aniNavi('+='+(l*200), time);
					return false;
				});
			
			$(this).parent().prevAll('.cloned')
				.clone()
				.removeClass('active')
				.prependTo($(this).parent().children('ul'))
				.children('a').unbind('click').click(function() {
					$('#mainnavi li.active').removeClass('active');
					$(this).parent().addClass('active');
					var l = (level+1)-$(this).parent().attr('data-level');
					$.aniNavi('+='+(l*200), time);
					return false;
				});
				
			$.aniNavi('-='+navwidth, time);
			
			return false;
		});
		*/
	});
})(jQuery);