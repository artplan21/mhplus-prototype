(function($){

	var PLUGIN_NS = 'Swipe';
	
	var defaults = {
		slideName: 'slide',	
		threshold: 150,
		moveAnimationSpeed: 500
	};
		
	$.fn.sliderSwipe = function(method) {
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
	
	$.fn.sliderSwipe.defaults = defaults;
	
	function init(options) {
	
		if (!options) options = {};
		
		options = $.extend({}, $.fn.slider.defaults, options);
		
		return this.each(function () {

			//Check we havent already initialised the plugin
			var plugin = $(this).data(PLUGIN_NS);

			if (!plugin) {
				plugin = new Swipe(this, options);
				$(this).data(PLUGIN_NS, plugin);
			}
		});
	}

	function Swipe(element, opts) {
		
		var self = $(element);
		
		var maxImages = self.find('.'+opts.slideName).length;
		var IMG_WIDTH = self.find('.'+opts.slideName+':first').width();
		var currentImg = 0;
		
		var speed = opts.moveAnimationSpeed;
			
		if (maxImages > 1) {
			// remove link for catching swipe events
			removeLinks();
			startSwipe();
		}
		
		this.resize = function() {
			if (maxImages > 1) {
				resize();
			}
		}
		
		this.destroy = function () {
			self.removeClass('swipe').css('margin-left', '').css('width', '');
			self.children('.'+opts.slideName).each(function() {
				$(this).removeClass('swipe');
			});
			addLinks();
			self.css("transform", "translate(0px,0)");
			self.swipe('destroy');
			self.data(PLUGIN_NS, null);
			self = null;
		};
		
		
		function resize() {
			IMG_WIDTH = self.find('.'+opts.slideName+':first').width();
			var parentWidth = self.parent().width();
			var leftMargin = (parentWidth - IMG_WIDTH) / 2;
			self.css('margin-left', leftMargin).css('width', (IMG_WIDTH * maxImages) + 50);
			scrollImages(IMG_WIDTH * currentImg, speed);
		}
		
		function startSwipe() {
			self.addClass('swipe');
			resize();

			self.children('.'+opts.slideName).each(function() {
				$(this).addClass('swipe');
			});
			
			self.swipe({
				tap:function(event, target) {
					 //window.location.href = $(target).prev('a').attr('href');
				},
				triggerOnTouchEnd: true,
				swipeStatus: swipeStatus,
				allowPageScroll: "vertical",
				threshold: opts.threshold
			});
		}
		
		
		function removeLinks() {
			self.children('.'+opts.slideName).each(function() {
				var link = $(this).children('a');
				link.children().prependTo($(this));
				link.prependTo($(this));
			});
		}
		
		function addLinks() {
			self.children('.'+opts.slideName).each(function() {
				var link = $(this).children('a');
				var img = $(this).children('img');
				link.appendTo($(this));
				img.appendTo(link);
			});
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
		}

		function nextImage() {
			currentImg = Math.min(currentImg + 1, maxImages - 1);
			scrollImages(IMG_WIDTH * currentImg, speed);
		}


		function scrollImages(distance, duration) {
			self.css("transition-duration", (duration / 1000).toFixed(1) + "s");

			//inverse the number we set in the css
			var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
			self.css("transform", "translate(" + value + "px,0)");
		}
		
	}

})(jQuery);