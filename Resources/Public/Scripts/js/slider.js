(function($){
	$.fn.slider = function(options) {

		return this.each(function(){
			
			var defaults = {
				stageName: 'slider-stage',
				slideName: 'slide',
				slideDescName: 'slide-desc',
				slideTitleName: 'slide-title',
				slideTextName: 'slide-text',
				openClass: 'open',
				hideClass: 'closed',
				titleHeight: 34,
				moveAnimationSpeed: 800,
				imageAnimationSpeed: 1000 
			};

			//initial variables
			var opts = $.extend(defaults, options);
			
			var self = $(this);
			var defaultHeight = getDefaultHeight(self.children('.'+opts.slideName+':first').children('.'+opts.slideDescName));
			
			// create stage
			var sliderStage = $('<div>').addClass(opts.stageName).appendTo(self);
	
			// set counter for relations
			var i = 0;
			
			self.children('.'+opts.slideName).each(function() {
			
				i++;
				$(this).attr('data-slide-count', i);
				
				// move description to stage
				$(this).children('.'+opts.slideDescName)
				.appendTo(sliderStage)
				.attr('data-slide-count', i)
				.addClass(i == 1 ? opts.hideClass : opts.openClass)
				.css('visibility', 'hidden') // hide before animated
				.children('.'+opts.slideTitleName).click(function() {
					// click function on slider title for animation
		
					if ($(this).parent().hasClass(opts.openClass)) return false;
	
					// animate active back
					self.find('.'+opts.slideDescName+'.'+opts.openClass).animate({
						height: opts.titleHeight
					}, opts.animationSpeed, function() {
						$(this).css('visibility', 'visible')
					});
					
					self.find('.'+opts.slideName+'[data-slide-count="'+self.find('.'+opts.slideDescName+'.'+opts.openClass).attr('data-slide-count')+'"]').stop(true, false).animate({
						opacity: 0				
					},opts.imageAnimationSpeed, function(){
						// hide!
						$(this).hide()
					});
				
					// toggle classes
					self.find('.'+opts.slideName+'.'+opts.openClass).removeClass(opts.openClass).addClass(opts.hideClass);
					self.find('.'+opts.slideName+'[data-slide-count="'+$(this).parent().attr('data-slide-count')+'"]').removeClass(opts.hideClass).addClass(opts.openClass);
					self.find('.'+opts.slideDescName+'.'+opts.openClass).removeClass(opts.openClass).addClass(opts.hideClass);
					
					$(this).parent().removeClass(opts.hideClass).addClass(opts.openClass);
					
					// animate
					$(this).parent().animate({
							height: ( $(this).parent().attr('data-slide-height') != undefined ? parseInt($(this).parent().attr('data-slide-height')) : defaultHeight) + $(this).parent().children('.'+opts.slideTextName).height()
						}, opts.animationSpeed, function() {
							// remove calculation errors
							$(this).height('auto');
							// set new default height
							$(this).attr('data-slide-height', getDefaultHeight($(this)));
							$(this).css('visibility', 'visible')
					});
					
					// show and animate 
					self.find('.'+opts.slideName+'[data-slide-count="'+$(this).parent().attr('data-slide-count')+'"]').stop(true, false).show().animate({
						opacity: 1
					},opts.imageAnimationSpeed, function(){
						$(this).show()
					});					
				});
			});
			
			// start
			$('.'+opts.stageName+' .'+opts.slideDescName+':first').children('.'+opts.slideTitleName).click();

				
			function getDefaultHeight(element) {
				var defaultHeight = (element.height() + parseInt(element.css('paddingTop')) + parseInt(element.css('paddingBottom'))) - element.children('.'+opts.slideTextName).height();
				return defaultHeight;
			}
		});
	};

})(jQuery);