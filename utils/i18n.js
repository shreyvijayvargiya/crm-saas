import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import es from "../locales/es.json";
import it from "../locales/it.json";
import fr from "../locales/fr.json";
import de from "../locales/de.json";
import zh from "../locales/zh.json";
import ja from "../locales/ja.json";

if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources: {
			en: { translation: en },
			hi: { translation: hi },
			es: { translation: es },
			it: { translation: it },
			fr: { translation: fr },
			de: { translation: de },
			zh: { translation: zh },
			ja: { translation: ja },
		},
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
	});
}

export default i18n;
