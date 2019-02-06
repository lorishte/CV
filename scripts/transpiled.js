'use strict';

var menuLinks = $('.nav-link');
var headerHeight = $('header').height();

var progressBars = $('.progress-bar');
var scaleInWords = {
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
};

// Make menu active
menuLinks.click(function () {
	menuLinks.removeClass('active');
	$(this).addClass('active');
});

progressBars.each(function () {
	var el = $(this);

	for (var i = 0; i <= 10; i++) {
		el.append('<span class="scale-label graph-' + i + '">' + i * 10 + '%</span>');
	}
});

//smooth scroll
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[href=""]').on('click', function (e) {
	e.preventDefault();
	$(document).off('scroll');

	var target = $(this).attr('href'); //Get the target
	var scrollToPosition = $(target).offset().top - headerHeight;

	$('html, body').animate({
		'scrollTop': scrollToPosition
	}, 1000);

	$(document).on('scroll', changeMenuOnScroll);

});

$(document).on('scroll', changeMenuOnScroll);

function changeMenuOnScroll () {
	var scrollPos = $(document).scrollTop() + headerHeight;

	// Add class 'active' to pressed menu link, remove class 'active' from current active menu link
	menuLinks.each(function () {
		var currLink = $(this);
		var targetedSection = $(currLink.attr('href'));

		if (Math.floor(targetedSection.position().top) <= scrollPos && targetedSection.position().top + targetedSection.height() > scrollPos) {
			currLink.addClass('active');
		} else {
			currLink.removeClass('active');
		}
	});
}