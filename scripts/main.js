$(document).ready(function () {
	console.log(222)
});

// Get all links
// Remove links that don't actually link to anything
$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.not('[href=""]')
	.on('click', function (e) {
		e.preventDefault();
		$(document).off('scroll');

		let target = $(this).attr('href'); //Get the target
		let scrollToPosition = $(target).offset().top

		//smooth scroll
		$('html, body').animate({
			'scrollTop': scrollToPosition
		}, 1000, 'swing', function () {
			window.location.hash = target;
			$('html').animate({'scrollTop': scrollToPosition + 1}, 0);
		});
	});