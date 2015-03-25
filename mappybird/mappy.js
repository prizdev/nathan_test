// scraped, origin and mtime incoming

function Mappy (origin, mtime, scraped) {

	this.origin = origin;
	this.mtime = mtime;
	this.scraped = scraped;

	this.mapResult = 1;

}

Mappy.prototype.getRoutes = function () {
	console.log('mp-origin: ' + this.origin);
	console.log('mp-mtime: ' + this.mtime);
	return this.mapResult;
}

module.exports = Mappy;