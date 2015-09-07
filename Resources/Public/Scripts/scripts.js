$(document).ready(function() {

	var isMobile = function() {
		if ($('#navi:visible').length > 0) return true;
		return false;
	}
	
	$('body').addClass('js');
	
	$('#navi').click(function() {
		$('body').toggleClass('naviopen');
		return false;
		if  ($('body').hasClass('naviopen')) {
			$( "#mainnavi" ).animate({
				left: "0",
			}, 200, function() {
				// Animation complete.
			});
			/*
			$('#contentwrapper').animate({
				marginLeft: "200",
			}, 500, function() {
			});
			$('body').css('width', $(window).width()).css('overflow-x', 'hidden');
			*/
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
});