let menuLinks = $('.nav-link');
let headerHeight = $('header').height();

// Make menu active
menuLinks.click(function () {
	menuLinks.removeClass('active');
	$(this).addClass('active');
});

//smooth scroll
$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.not('[href=""]')
	.on('click', function (e) {
		e.preventDefault();
		$(document).off('scroll');

		let target = $(this).attr('href'); //Get the target
		let scrollToPosition = $(target).offset().top - headerHeight;

		$('html, body').animate({
			'scrollTop': scrollToPosition
		}, 1000, 'swing', function () {
			window.location.hash = target;
			$('html').animate({'scrollTop': scrollToPosition + 1}, 0);

			$(document).on('scroll', changeMenuOnScroll);
		});
	});

$(document).on('scroll', changeMenuOnScroll);

function changeMenuOnScroll () {
	let scrollPos = $(document).scrollTop() + headerHeight;

	// Add class 'active' to pressed menu link, remove class 'active' from current active menu link
	menuLinks.each(function () {
		let currLink = $(this);
		let targetedSection = $(currLink.attr('href'));

		if (Math.floor(targetedSection.position().top) <= scrollPos
			&& targetedSection.position().top + targetedSection.height() > scrollPos) {
			currLink.addClass('active');
		}
		else {
			currLink.removeClass('active');
		}
	});
}



