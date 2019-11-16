// Player

let player = document.getElementById('player');
let playBtn = $('#play-btn');
let pauseBtn = $('#pause-btn');
let stopBtn = $('#stop-btn');
let volUp = $('#vol-up');
let volDown = $('#vol-down');

let playerFill = $('.player-fill');

let timer;

player.volume = .1;

playBtn.click(() => playTrack());

pauseBtn.click(() => pauseTrack());

stopBtn.click(() => stopTrack());

volUp.click(() => {
	if (player.volume < 1) {
		player.volume = (player.volume + 0.1).toFixed(1);
	}
});

volDown.click(() => {
	if (player.volume > 0) {
		player.volume = (player.volume - 0.1).toFixed(1);
	}
});

function playTrack () {
	player.play();
	timer = setInterval(getTrackTime, 1000);
	playBtn.addClass('active');
	pauseBtn.removeClass('active');
}

function getTrackTime () {
	let trackTime = player.duration;
	let currentTime = player.currentTime;

	let minutes = Math.floor(trackTime / 60);
	let seconds = Math.round(trackTime % 60);

	let percent = Number(currentTime / trackTime * 100).toFixed(5);
	console.log(minutes, seconds, currentTime, percent + '%');

	playerFill.css('width', percent + '%');

	if (percent > 99) stopTrack();
}

function pauseTrack () {

	if (player.paused === true) {
		playTrack();
		return;
	}

	player.pause();
	clearInterval(timer);

	pauseBtn.addClass('active');
	playBtn.removeClass('active');
}

function stopTrack () {
	player.pause();
	clearInterval(timer);
	player.currentTime = 0;

	playerFill.css('width', 0);
	pauseBtn.removeClass('active');
	playBtn.removeClass('active');
}
