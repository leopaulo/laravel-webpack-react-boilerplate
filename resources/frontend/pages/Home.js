import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LangDataProvider } from 'frontend/components/Language';

export default function Home() {
	return (
		<LangDataProvider category="home">
			<FormattedMessage id="welcome" />
		</LangDataProvider>
	);
}
