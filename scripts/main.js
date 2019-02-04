let menuLinks = $('.nav-link');
let headerHeight = $('header').height();

let progressBars = $('.progress-bar');
let scaleInWords = {
	0: 'zero',
	10: 'ten',
	20: 'twenty',
	30: 'thirty',
	40: 'forty',
	50: 'fifty',
	60: 'sixty',
	70: 'seventy',
	80: 'eighty',
	90: 'ninety',
	100: 'hundred'
}

// Make menu active
menuLinks.click(function () {
	menuLinks.removeClass('active');
	$(this).addClass('active');
});

progressBars.each(function () {
	let el = $(this);

	for (let i = 0; i <= 10; i++) {
		el.append(`<span class="scale-label graph-${i}">${i * 10}%</span>`)
	}
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



