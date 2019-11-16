const { series } = require('gulp');

function defaultTask(cb) {
	// place code for your default task here
	cb();
}

exports.build = build;
exports.default = series(clean, build);