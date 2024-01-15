class Localization {
	constructor(CookiesManager) {
		this.CookiesManager = CookiesManager;
		this.localizations = {};

		this.init();
	}

	init() {
		if ( typeof(lang) == 'undefined' ) {
			return false;
		}

		var settingsLang = this.CookiesManager.get('lang');

		if ( lang[settingsLang] ) {
			this.localizations = lang[settingsLang];
		}
	}

	getTranslation(string, replace) {
		var translate = ( this.localizations[string] ) ? this.localizations[string] : string;
		for ( var value in replace ) {
			translate = translate.replaceAll(value, replace[value]);
		}

		return translate;
	}
}