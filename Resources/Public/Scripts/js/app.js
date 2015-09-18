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
		},
		topbar: {
			back_text: 'Übersicht Menü', // Define what you want your custom back text to be if custom_back_text: true
		}
	});
		
	$(document).ready(function() {
		
		var isMobile = function() {
			if ($('#toggle-topbar:visible').length > 0) return true;
			return false;
		}
		
		function setMainnavHeight() {
			$('#mainnav').css('visibility', 'visible');
			setTimeout(function() {
				var max_avail_height = $('body').height() - $('#mainnav').offset().top + 5;
				$('#mainnav').css('height', max_avail_height);
				setTimeout(function() {
					if (!$('#mainnav').hasClass('expanded') && parseInt($('#mainnav').position().left) < 245) $('#mainnav').css('visibility', 'hidden');
				},200);
			}, 10);
		}
		
		$('#mainnav').click(function() {
			if ($(this).hasClass('expanded') && isMobile()) setMainnavHeight();
		});
		
		/* create off-canvas menue toggle */
		$('#toggle-topbar').click(function() {
			
			// toggle class
			$('#mainnav').toggleClass('expanded');
				
			// some more
			if($('#mainnav.expanded').length == 0) {
			
				// set height of top-bar (overwrite top-bar-js)
				setMainnavHeight()
				
				// hide other dependencies
				$('body').removeClass('expanded');
				$('#exit-off-canvas').remove();
			}
			else {
				
				// show other dependencies
				
				$('body').addClass('expanded');
				
				// set height of mainnav again
				setMainnavHeight()
				
				// create a close overlay
				$('<a>')
					.attr('id', 'exit-off-canvas')
					.appendTo('body')
					.css('height', ($('body').height()-$('#mainnav').offset().top))
					.css('top', $('#mainnav').offset().top)
					.click(function() {
						$('#toggle-topbar').click();
					});
					
				// move top-bar to active link
				if ($('#mainnav li.moved').length == 0) {
					$('#mainnav li.enabled a:first').each(function() {
						$(this).click();
					});
				}
			}
			
		});
		
		/* replace target menue to select menue */
		var replaceTargetNav = function() {
			var select = $('<select>')
					.attr('id', 'targetnav-select')
					.attr('aria-hidden', 'true')
					.insertBefore('#mainnav')
					.change(function(){
						window.location.href = $(this).children('option:selected').val();
					});
			$('#targetnav li a').each(function(){
				var a = $('<option>')
					.attr('value', $(this).attr('href'))
					.text($(this).text());
				a.appendTo(select);
			});			
		}
		replaceTargetNav();
		
		/* start slider */
		$('#mainslider').slider({imageAnimationSpeed: 1200, moveAnimationSpeed: 600});
		

	});
})(jQuery);