import en from '../locales/en';
import fr from '../locales/fr';
const I18n = require('react-i18nify').I18n;

I18n.setTranslations({
    "en": en,
    "fr": fr
});

const WebsiteLang = {
  "en-US": 'en',
  "fr-FR": 'fr',
    "fr": 'fr',
    "en": "en"
};

class LanguageService {

    constructor(){

        if(window.location.pathname === '/') {
            console.log(navigator.language || navigator.userLanguage)
            console.log(WebsiteLang[navigator.language || navigator.userLanguage]);
            this.setLang(WebsiteLang['fr']);
        } else {
            let splittedPath = window.location.pathname.split('/');
            this.setLang(splittedPath[1])
        }
    }

    setLang(lang){
        if(!window.app)
            window.app = {};
        this.lang = lang;

        window.app.lang = this.lang;
        I18n.setLocale(this.lang);
        if(window.location.pathname === '/')
        window.history.pushState(null, "",'/' + this.lang + window.location.pathname);
    }


    /**
     *
     * buildPath with language before path
     *
     * @param string root
     *
     * @return string
     **/
    buildPath(path) {
        return '/' + this.lang + path
    }
}



let languageService = new LanguageService();

export default languageService;