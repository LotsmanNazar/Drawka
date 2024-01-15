class HTTPController {
	constructor(appExpress, path) {
		this.appExpress = appExpress;
		this.path = path;
		this.publicPath = __dirname + '../../../../';

		this.init();
	}

	init() {
		this.appExpress.get('/', (request, response) => {
		  response.sendFile(this.path.resolve(this.publicPath + 'index.html'));
		});

		this.appExpress.get('/public/app/Langs/lang.js', (request, response, next) => {
			var cookies = this.getCookies(request);
			var lang = ( cookies && cookies.lang ) ? cookies.lang : 'en';
			var file = this.publicPath + '/public/app/Langs/' + lang + '.js';

		  response.sendFile(this.path.resolve(file));
		});

		this.appExpress.get('*', (request, response, next) => {
			var file = this.publicPath + request.originalUrl;

		  response.sendFile(this.path.resolve(file));
		});
	}

	getCookies(request) {
		var cookiesArr = ( request.headers.cookie ) ? request.headers.cookie.split('; ') : [];
		var cookies = {};
		for ( var i = 0; i < cookiesArr.length; i++) {
			var cookie = cookiesArr[i].split('=');
			cookies[cookie[0]] = cookie[1];
		}

		return cookies;
	}
}

module.exports = HTTPController;