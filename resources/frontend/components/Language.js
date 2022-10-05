import React from 'react';
import { IntlProvider } from 'react-intl';
import LangContextProvider from 'frontend/contexts/Language';
import LangDataProvider from './language/LangDataProvider';

export function LangProvider({ config, children }) {
	return (
		<IntlProvider locale={config.default}>
			<LangContextProvider config={config}>{children}</LangContextProvider>
		</IntlProvider>
	);
}

export { LangDataProvider };
