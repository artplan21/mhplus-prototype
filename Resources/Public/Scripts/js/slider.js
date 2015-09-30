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
				slideshowSpeed: 5000
			};

			//initial variables
			var opts = $.extend(defaults, options);
			
			var self = $(this);
			var defaultHeight = getDefaultHeight(self.children('.'+opts.slideName+':first').children('.'+opts.slideDescName));
			
			var maxImages = self.find('.'+opts.slideName).length;
			var IMG_WIDTH = self.find('.'+opts.slideName+':first').width();
			var currentImg = 0;
			
			var speed = 500;
			var imgs;	
		
			var parentWidth = self.parent().width();
			var leftMargin = (parentWidth - IMG_WIDTH) / 2;
			
			
			// create stage
			var sliderStage = $('<div>').addClass(opts.stageName).appendTo(self);
	
			// set counter for relations
			var i = 0;
		
			self.children('.'+opts.slideName).each(function() {
			
				i++;
				$(this).attr('data-slide-count', i);
				
				// remove link for catching swipe events
				var link = $(this).children('a');
				link.children().prependTo($(this));
				link.prependTo($(this));
					
				// move description to stage
				if ( (!isTouch() || ( isTouch() && !isMobile() )) && maxImages > 1) {
				
					$(this).children('img').click(function() {
						window.location = $(this).prev('a').attr('href');
					});
				
					$(this).children('.'+opts.slideDescName)
					.appendTo(sliderStage)
					.attr('data-slide-count', i)
					.addClass(i == 1 ? opts.hideClass : opts.openClass)
					.css('visibility', 'hidden') // hide before animated
					.children('.'+opts.slideTitleName).click(function(e) {
						animate($(this), e);
					});
				}
			});
			
			
			if (isMobile() && isTouch() && maxImages > 1) {
			
				self.addClass('swipe').css('margin-left', leftMargin).css('width', (IMG_WIDTH * maxImages) + 20);

				var swipeOptions = {
					triggerOnTouchEnd: true,
					swipeStatus: swipeStatus,
					allowPageScroll: "vertical",
					threshold: 75,
					doubleTap:function(event, target) {
						  tapCount++;
						  console.log(target);
						},
				};
				
				self.children('.'+opts.slideName).each(function() {
					$(this).addClass('swipe');
					
				});
				
				imgs = $('#mainslider');
				imgs.swipe({
					triggerOnTouchEnd: true,
					swipeStatus: swipeStatus,
					allowPageScroll: "vertical",
					threshold: 75,
					tap:function(event, target) {
						  console.log(target);
						},
					swipe:function() {
					}
				});
				
			}
			else {
				
				// initial start
				$('.'+opts.stageName+' .'+opts.slideDescName+':first').children('.'+opts.slideTitleName).click();
			
				// auto start ?
				if (opts.autoPlay && i>1) {
					var autoPlay = setInterval(function() {
						startRotate();
					}, opts.slideshowSpeed);
				}
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
			
			function isMobile() {
				if ($('#toggle-topbar:visible').length > 0) return true;
				return false;
			}
			
			function isTouch() {
				//return false;
				if ($('html').hasClass('touch')) return true;
				return false;
			}
			
			
			function swipeStatus(event, phase, direction, distance) {
				//If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
				if (phase == "move" && (direction == "left" || direction == "right")) {
					var duration = 0;

					if (direction == "left") {
						scrollImages((IMG_WIDTH * currentImg) + distance, duration);
					} else if (direction == "right") {
						scrollImages((IMG_WIDTH * currentImg) - distance, duration);
					}

				} else if (phase == "cancel") {
					scrollImages(IMG_WIDTH * currentImg, speed);
				} else if (phase == "end") {
					if (direction == "right") {
						previousImage();
					} else if (direction == "left") {
						nextImage();
					}
				}
			}

			function previousImage() {
				currentImg = Math.max(currentImg - 1, 0);
				scrollImages(IMG_WIDTH * currentImg, speed);
				imgs.find('.'+opts.slideDescName+'[data-slide-count="'+(currentImg+1)+'"]').each(function() {
					$(this).show();
				});
			}

			function nextImage() {
				currentImg = Math.min(currentImg + 1, maxImages - 1);
				scrollImages(IMG_WIDTH * currentImg, speed);
				imgs.find('.'+opts.slideDescName+'[data-slide-count="'+(currentImg+1)+'"]').each(function() {
					$(this).show();
				});
			}

			/**
			 * Manually update the position of the imgs on drag
			 */
			function scrollImages(distance, duration) {
				imgs.css("transition-duration", (duration / 1000).toFixed(1) + "s");

				//inverse the number we set in the css
				var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
				imgs.css("transform", "translate(" + value + "px,0)");
			}
			
			function animate(element, e) {
				
				if (element.parent().hasClass(opts.openClass)) return false;
				
				// stop auto play ?
				if (opts.stopOnClick && e.originalEvent != undefined) clearInterval(autoPlay);
				
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