$(document).ready(function() {
	$('.carousel-inner .item > a > img').each(function() {
		if($(this).data('type') == 'video') {
			var item = $(this).parent();
			var img = $(this).remove();

			var video = $('<video autoplay="autoplay"><source type="video/mp4" /></video>')
				.find('source').attr('src', $(this).attr('src')).end()
				.attr('style', $(this).attr('style'));

			item.find('.carousel-caption').before(video);
			item.find('video').get(0).play();
		}
		else if($(this).data('type') == 'youtube') {
			var item = $(this).parent();
			var img = $(this).remove();

			var video = $('<iframe class="embed-responsive-item" frameborder="0" allowfullscreen></iframe>')
				.attr('src', $(this).attr('src'));

			item.find('.carousel-caption').before(video).parent().addClass('embed-responsive').addClass('embed-responsive-16by9');
		}
	});

	$('.carousel-inner .item > a > .carousel-caption > h3 > span').each(function() {
		if($(this).text() == '') {
			$(this).parent().addClass('hide');
		}
	});

	$('.carousel-inner .item > a > .carousel-caption > p > span').each(function() {
		if($(this).text() == '') {
			$(this).parent().addClass('hide');
		}
	});
});
