import React from 'react';
import languageReducer from './language/languageReducer';
import { getCookie } from 'frontend/utils/cookie';

let LanguageContext = React.createContext();

export default function LangProvider({ children, config }) {
	let availableProp = config.available || '';

	let [langState, langDispatch] = React.useReducer(languageReducer, {
		active: config.force || getCookie(config.key) || config.default,
		available: availableProp.split(','),
	});

	return (
		<LanguageContext.Provider
			value={{
				langState,
				langDispatch,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export let LangConsumer = LanguageContext.Consumer;
