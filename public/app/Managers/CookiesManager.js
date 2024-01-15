class CookiesManager {
	constructor() {

	}

	add(name, value, time = 60*60*24*30) {
		var date = new Date();
		time = date.getTime() + time * 1000;
    date.setTime(time);

    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
	}

	get(name) {
		var cookies = document.cookie.split('; ');

		for ( var i = 0; i < cookies.length; i++ ) {
			var cookiesData = cookies[i].split('=');
			var cookieName = cookiesData[0];
			var value = cookiesData[1];

			if ( cookieName == name ) {
				return value;
				break;
			}
		}

		return false;
	}

	remove(name) {
		var date = new Date();
		var time = date.getTime() - 10000;
    date.setTime(time);

    document.cookie = name + '=' + '' + '; expires=' + date.toUTCString() + '; path=/';
	}
}