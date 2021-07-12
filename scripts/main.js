let menuLinks = $('.nav-link');

let mainNav = $('.nav-primary');

let headerHeight = $('header').height();

let projectInfoBlocks = $('.project-info');

let toggleInfoBtns = $('.toggle-project-info');

let progressBars = $('.progress-bar');

let toggleMenuBtn = $('#toggle-menu-btn');

let personalInfo = $('header .personal');

let resSmall = 768;
let resXS = 420;

// Make menu link active - change color
menuLinks.click(function () {
	menuLinks.removeClass('active');

	let currentLink = $(this);
	currentLink.addClass('active');

	if (window.innerWidth <= resSmall) {
		setTimeout(function () {
			mainNav.removeClass('visible');
			currentLink.removeClass('active');
			toggleMenuBtn.removeClass('clicked');
		}, 1000);
	}
});

toggleMenuBtn.click(function () {

	if (mainNav.hasClass('visible')) {
		mainNav.removeClass('visible');
		$(this).removeClass('clicked');
		return;
	}
	mainNav.addClass('visible');
	$(this).addClass('clicked');

});

// Add progress bar labels
progressBars.each(function () {
	let el = $(this);

	for (let i = 0; i <= 10; i++) {
		el.append(`<span class="scale-label graph-${i}">${i * 10}</span>`);
	}
});

// Show hide project info logic
toggleInfoBtns.click(function () {
	let btn = $(this);
	let infoPanel = $(this).parent().find('.project-info');

	infoPanel.toggle();

	if (btn[0].innerHTML === 'info <i class="fa fa-caret-down" aria-hidden="true"></i>') {
		btn[0].innerHTML = 'info <i class="fa fa-caret-up" aria-hidden="true"></i>';
	} else {
		btn[0].innerHTML = 'info <i class="fa fa-caret-down" aria-hidden="true"></i>';
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

		$('html, body')
			.animate({
				'scrollTop': scrollToPosition
			}, 1000);

		if (window.innerWidth > resSmall) {
			$(document).on('scroll', changeMenuOnScroll);
		} else {
			$(document).on('scroll', changeHeader);
		}
	});

$(document).on('scroll', function () {
	changeMenuOnScroll();
	changeHeader();
});


// Change menu color on scroll
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

function changeHeader () {
	//Check if resolution is bigger
	if (window.innerWidth <= resSmall) {
		let wScroll = $(this).scrollTop();

		if (wScroll > 300 && !personalInfo.hasClass('.clipped')) {
			personalInfo.addClass('clipped');
		} else {
			personalInfo.removeClass('clipped');
		}
	}
}

$(window).resize(function () {

	// Hide/show project info based on resolution
	if (window.innerWidth > resXS) {
		projectInfoBlocks.css('display', 'block');
	} else {
		projectInfoBlocks.css('display', 'none');
	}

	if (window.innerWidth > resSmall) {
		personalInfo.removeClass('clipped');
	} else {
		changeHeader();
	}
});







