(function() {
	$.fn.scrollPagination = function(options) {
		var settings = { 
			nop     : 10, // 初始加载的条数
			offset  : 0, // 分页起始值
			error   : '没有了!', 
			delay   : 500, 
			scroll  : true // 是否自动加载
		}
		if(options) {
			$.extend(settings, options);
		}
		return this.each(function() {		
			$this = $(this);
			$settings = settings;
			var offset = $settings.offset;
			var busy = false; 
			if($settings.scroll == true) $initmessage = '<span class="ui-loading">更多</span>';
			else $initmessage = '<span class="refresh-down">查看更多</span>';
			$this.append('<div class="news-more nomore">'+$initmessage+'</div>');
			function getData() {
				$.post(app_path+'api.php?op=ajax_list', {
					action        : 'scrollpagination',
				    number        : $settings.nop,
				    offset        : offset,
				}, function(data) {
					$this.find('.news-more').html($initmessage);
					if(data == "") { 
						$this.find('.news-more').html($settings.error);	
						setTimeout(function(){
							$this.find('.news-more').hide(2500);
						},2000);
					}
					else {
					    offset = offset+$settings.nop; 
					   	$this.find('#main').append(data);
						busy = false;
					}
				});
			}
			getData(); 
			if($settings.scroll == true) {
				$(window).scroll(function() {
					if($(window).scrollTop() + $(window).height() > $this.height() && !busy) {
						busy = true;
						$this.find('.news-more').html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
						setTimeout(function() {
							getData();
							
						}, $settings.delay);
							
					}	
				});
			}
			$this.find('.news-more').click(function() {
				if(busy == false) {
					busy = true;
					getData();
				}
			});
		});
	}
})();
