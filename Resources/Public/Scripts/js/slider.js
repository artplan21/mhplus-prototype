(function($){

	var PLUGIN_NS = 'Caroussel';
	
	var defaults = {
		stageName: 'slider-stage',
		slideName: 'div.slide',
		slideDescName: 'div.slide-desc',
		slideTitleName: 'div.slide-title',
		slideTextName: 'div.slide-text',
		openClass: 'open',
		hideClass: 'closed',
		titleHeight: 34,
		moveAnimationSpeed: 800,
		imageAnimationSpeed: 1000,
		autoPlay: true,
		stopOnClick: true,
		slideshowSpeed: 5000
	};

	$.fn.slider = function(method) {
		var plugin = $(this).data(PLUGIN_NS);

		//Check if we are already instantiated and trying to execute a method	
		if (plugin && typeof method === 'string') {
			if (plugin[method]) return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		//Else not instantiated and trying to pass init object (or nothing)
		else if (!plugin && (typeof method === 'object' || !method)) {
			return init.apply(this, arguments);
		}

		return $(this);
	}
	
	$.fn.slider.defaults = defaults;
	
	function init(options) {
	
		if (!options) options = {};
		
		options = $.extend({}, $.fn.slider.defaults, options);
		
		return this.each(function () {

			//Check we havent already initialised the plugin
			var plugin = $(this).data(PLUGIN_NS);

			if (!plugin) {
				plugin = new Caroussel(this, options);
				$(this).data(PLUGIN_NS, plugin);
			}
		});
	}
		
		
	function Caroussel(element, opts) {
	
		var self = $(element);
		
		var defaultHeight = getDefaultHeight(self.find(opts.slideName+':first').find(opts.slideDescName));
	
		var autoPlay;
		var maxImages = self.find(opts.slideName).length;	
	
		
		// build stage
		buildStage();
			
		// initial start
		$('.'+opts.stageName+' '+opts.slideDescName+':first').find(opts.slideTitleName).click();
		
		// auto start ?
		if (opts.autoPlay && maxImages > 1) {
			autoPlay = setInterval(function() {
				startRotate();
			}, opts.slideshowSpeed);
		}
		
		
		this.destroy = function () {
			removeStage();
			if (autoPlay != undefined) clearInterval(autoPlay);
			self.data(PLUGIN_NS, null);
			self = null;
		};
		
		function buildStage() {
			// create stage
			var sliderStage = $('<div>').addClass(opts.stageName).appendTo(self);
			
			// set counter for relations
			var i = 0;
		
			self.find(opts.slideName).each(function() {
			
				i++;
				$(this).attr('data-slide-count', i);
								
				// move description to stage
				$(this).find(opts.slideDescName)
				.appendTo(sliderStage)
				.attr('data-slide-count', i)
				.addClass(i == 1 ? opts.hideClass : opts.openClass)
				//.css('visibility', 'hidden') // hide before animated
				.find(opts.slideTitleName).click(function(e) {
					animate($(this), e);
				});
			});
		}
		
		function removeStage() {
			
			$('.'+opts.stageName).find(opts.slideDescName).each(function() {
				
				var eq_slide = $(opts.slideName+'[data-slide-count="'+$(this).attr('data-slide-count')+'"]');
				
				// move description back to slide
				$(this)
					.appendTo(eq_slide)
					.removeAttr('data-slide-count')
					.removeClass(opts.hideClass)
					.removeClass(opts.openClass)
					.css('visibility', 'visible')
					.css('height', '')
					.find(opts.slideTitleName)
						.unbind('click')
					;
					
				eq_slide.removeAttr('data-slide-count').removeClass(opts.hideClass).removeClass(opts.openClass).css('display', '').css('opacity', '');
			});
			
			$('.'+opts.stageName).remove();
		}
		
		function startRotate() {
			var next = $('.'+opts.stageName+' '+opts.slideDescName+'.'+opts.openClass).next();
			var first = $('.'+opts.stageName+' '+opts.slideDescName+':first');
			if (next.length != 0) animate(next.find(opts.slideTitleName), false);
			else animate(first.find(opts.slideTitleName), false);
		}
					
		function getDefaultHeight(element) {
			var defaultHeight = (element.height() + parseInt(element.css('paddingTop')) + parseInt(element.css('paddingBottom'))) - element.find(opts.slideTextName).height();
			return defaultHeight;
		}
		
		function animate(element, e) {
			
			if (element.parent().hasClass(opts.openClass)) return false;
			
			// stop auto play ?
			if (opts.stopOnClick && e.originalEvent != undefined && autoPlay != undefined) clearInterval(autoPlay);
			
			// animate active back
			/*
			self.find(opts.slideDescName+'.'+opts.openClass).stop(true, false).animate({
				height: opts.titleHeight
			}, opts.animationSpeed, function() {
				$(this).css('visibility', 'visible');
			});
			*/
			
			/*
			self.find(opts.slideName+'[data-slide-count="'+self.find('.'+opts.slideDescName+'.'+opts.openClass).attr('data-slide-count')+'"]').stop(true, false).animate({
				opacity: 0				
			},opts.imageAnimationSpeed, function(){
				// hide!
				$(this).hide();
			});
			*/
			
			// toggle classes
			self.find(opts.slideName+'.'+opts.openClass).removeClass(opts.openClass).addClass(opts.hideClass);
			self.find(opts.slideName+'[data-slide-count="'+element.parent().attr('data-slide-count')+'"]').removeClass(opts.hideClass).addClass(opts.openClass);
			self.find(opts.slideDescName+'.'+opts.openClass).removeClass(opts.openClass).addClass(opts.hideClass);
			
			element.parent().removeClass(opts.hideClass).addClass(opts.openClass);
			
			/*
			// animate
			element.parent().stop(true, false).animate({
					height: ( element.parent().attr('data-slide-height') != undefined ? parseInt(element.parent().attr('data-slide-height')) : defaultHeight) + element.parent().children(opts.slideTextName).height()
				}, opts.animationSpeed, function() {
					// remove calculation errors
					$(this).height('auto');
					// set new default height
					$(this).attr('data-slide-height', getDefaultHeight($(this)));
					$(this).css('visibility', 'visible');
			});
			*/
			
			/*
			// show and animate 
			self.find(opts.slideName+'[data-slide-count="'+element.parent().attr('data-slide-count')+'"]').stop(true, false).show().animate({
				opacity: 1
			},opts.imageAnimationSpeed, function(){
				$(this).show();
			});		
			*/
		}
	
	}
	

})(jQuery);