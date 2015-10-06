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
				imageAnimationSpeed: 1000,
				autoPlay: true,
				stopOnClick: true,
				slideshowSpeed: 5000,
				destroy: false
			};
				
			//initial variables
			var opts = $.extend(defaults, options);
			
			var self = $(this);
			var defaultHeight = getDefaultHeight(self.children('.'+opts.slideName+':first').children('.'+opts.slideDescName));
			
			var autoPlay;
			
			var maxImages = self.find('.'+opts.slideName).length;
			
			console.log($(this).data('slider'));
			// destroy?
			if (opts.destroy) destroy();
			else if(!$(this).data('slider')) init(); // init			
			
			function init() {
			
				$(this).data('slider', 'initated');
				
				// build stage
				buildStage();
					
				// initial start
				$('.'+opts.stageName+' .'+opts.slideDescName+':first').children('.'+opts.slideTitleName).click();
				
				// auto start ?
				if (opts.autoPlay && maxImages > 1) {
					autoPlay = setInterval(function() {
						startRotate();
					}, opts.slideshowSpeed);
				}
			}
			
			function destroy() {
				//console.log('Hallo');
			}
			
			function buildStage() {
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
					.children('.'+opts.slideTitleName).click(function(e) {
						animate($(this), e);
					});
				});
			}
			
			function startRotate() {
				var next = $('.'+opts.stageName+' .'+opts.slideDescName+'.'+opts.openClass).next();
				var first = $('.'+opts.stageName+' .'+opts.slideDescName+':first');
				if (next.length != 0) animate(next.children('.'+opts.slideTitleName), false);
				else animate(first.children('.'+opts.slideTitleName), false);
			}
						
			function getDefaultHeight(element) {
				var defaultHeight = (element.height() + parseInt(element.css('paddingTop')) + parseInt(element.css('paddingBottom'))) - element.children('.'+opts.slideTextName).height();
				return defaultHeight;
			}
			
			function animate(element, e) {
				
				if (element.parent().hasClass(opts.openClass)) return false;
				
				// stop auto play ?
				if (opts.stopOnClick && e.originalEvent != undefined && autoPlay != undefined) clearInterval(autoPlay);
				
				// animate active back
				self.find('.'+opts.slideDescName+'.'+opts.openClass).stop(true, false).animate({
					height: opts.titleHeight
				}, opts.animationSpeed, function() {
					$(this).css('visibility', 'visible');
				});
				
				self.find('.'+opts.slideName+'[data-slide-count="'+self.find('.'+opts.slideDescName+'.'+opts.openClass).attr('data-slide-count')+'"]').stop(true, false).animate({
					opacity: 0				
				},opts.imageAnimationSpeed, function(){
					// hide!
					$(this).hide();
				});
			
				// toggle classes
				self.find('.'+opts.slideName+'.'+opts.openClass).removeClass(opts.openClass).addClass(opts.hideClass);
				self.find('.'+opts.slideName+'[data-slide-count="'+element.parent().attr('data-slide-count')+'"]').removeClass(opts.hideClass).addClass(opts.openClass);
				self.find('.'+opts.slideDescName+'.'+opts.openClass).removeClass(opts.openClass).addClass(opts.hideClass);
				
				element.parent().removeClass(opts.hideClass).addClass(opts.openClass);
				
				// animate
				element.parent().stop(true, false).animate({
						height: ( element.parent().attr('data-slide-height') != undefined ? parseInt(element.parent().attr('data-slide-height')) : defaultHeight) + element.parent().children('.'+opts.slideTextName).height()
					}, opts.animationSpeed, function() {
						// remove calculation errors
						$(this).height('auto');
						// set new default height
						$(this).attr('data-slide-height', getDefaultHeight($(this)));
						$(this).css('visibility', 'visible');
				});
				
				// show and animate 
				self.find('.'+opts.slideName+'[data-slide-count="'+element.parent().attr('data-slide-count')+'"]').stop(true, false).show().animate({
					opacity: 1
				},opts.imageAnimationSpeed, function(){
					$(this).show();
				});		
			
			}
		
		});
	};

})(jQuery);