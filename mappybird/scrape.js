// origin and mprice incoming

function Scrape (origin, mprice) {

	this.origin = origin;
	this.mprice = mprice;
	this.listings = {};

	// here we'd scrape a website with cheerio and build a response based on certain filters
	// but we're faking it for the demo

	this.listings = {
		"area1" : 
		[ 
			{
				"gAddress"  : "47.544207,-122.375851",
				"price" : 700
			},
			{
				"gAddress"  : "%31%31%32%30%32+%32nd+Lane+SW+seattle+wa+US", 
				"price" : 800
			}
		],                       
		"area2"  : 
		[
			{
				"gAddress"  : "%39%30%32%30+%32%30th+Ave+Sw+Seattle+Wa+US", 
				"price" : 1000
			}, 
			{
				"gAddress"  : "%34%34%32%30+Southwest+Admiral+way+seattle+wa+US", 
				"price" : 900
			}
		]    
	};

}

Scrape.prototype.getListings = function () {
	console.log('sc-origin: ' + this.origin);
	console.log('sc-mprice: ' + this.mprice);
	return this.listings;
}

module.exports = Scrape;