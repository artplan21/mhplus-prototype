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
		
		
		/* toggle searchinput in mobile */
		$('#searchinput form button').click(function(event) {		
			var $target = $('#searchinput form input');
			console.log($target.val());
			if (isMobile()) {
				if (!$target.hasClass('show') || $target.val() == '') {
					event.preventDefault();
					$target.toggleClass('show');
				}
			}
		});
		
		
		/* set height and visibility of the menue */
		var setMainnavHeight = function() {
			$('#mainnav').css('visibility', 'visible');
			if (isMobile()) {
				setTimeout(function() {
					var max_avail_height = $('body').height() - $('#mainnav').offset().top + 5;
					$('#mainnav').css('height', max_avail_height);
					setTimeout(function() {
						if (!$('#mainnav').hasClass('expanded') && parseInt($('#mainnav').position().left) < 245) $('#mainnav').css('visibility', 'hidden');
					},200);
				}, 10);
			}
		}
		
		/* start function on resize window */
		$( window ).resize(function() {
			if (isMobile() && $('body').hasClass('expanded')) $('#toggle-topbar').click();
			setMainnavHeight();
		});
		
		$('#mainnav').click(function() {
			if ($(this).hasClass('expanded') && isMobile()) setMainnavHeight();
		});
		
		
		/* create off-canvas menue toggle */
		$('#toggle-topbar').click(function() {
			
						
			// toggle class
			$('#mainnav').toggleClass('expanded');
				
			// some more
			if($('#mainnav.expanded').length == 0) {
			
				// set height and visibility of top-bar (overwrite top-bar-js)
				setMainnavHeight()
				
				$('#toggle-topbar').css('left', -300);
				
				// hide other dependencies
				$('body').removeClass('expanded');
				$('#exit-off-canvas').remove();
			}
			else {
				
				$('#toggle-topbar').css('left', $('body').width() - $('#mainnav').width() - $('#toggle-topbar').width());
				
				// show other dependencies
				$('body').addClass('expanded');
				
				// set height and visibility of mainnav again
				setMainnavHeight()
				
				// create a closer overlay
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
		
		/* function for replacing targetnav and tabmenues */
		$.replaceToSelectMenue = function(opts) {
			var select = $('<select>')
					.attr('aria-hidden', 'true')
					.insertBefore(opts.insertBefore)
					.change(function(){
						window.location.href = $(this).children('option:selected').val();
					});
			if (opts.id) select.attr('id', opts.id);
			if (opts.addclass) select.addClass(opts.addclass);
			
			opts.selector.each(function(){
				var a = $('<option>')
					.attr('value', $(this).attr('href'))
					.attr('selected', $(this).hasClass('active') || $(this).parent().hasClass('active') ? 'selected' : false)
					.text($(this).text());
				a.appendTo(select);
			});	
					
		}
		
		/* replace targetnav-select */
		$.replaceToSelectMenue({id: 'targetnav-select', insertBefore: $('#mainnav'), selector: $('#targetnav li a')});
		
		$('.tabs').each(function(){
			$.replaceToSelectMenue({addclass: 'tabs-select', insertBefore: $(this), selector: $(this).find('a')});
		});
		
		/* start slider */
		$('#mainslider').slider({imageAnimationSpeed: 1200, moveAnimationSpeed: 600});
			

	});
})(jQuery);

