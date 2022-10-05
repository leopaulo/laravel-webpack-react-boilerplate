import React from 'react';
import NestedIntlProvider from 'frontend/components/NestedIntlProvider';

const MESSAGES = {
	welcome: 'Welcome! Its working.',
};

export default function Provider({ children, ...props }) {
	return (
		<NestedIntlProvider {...props} messages={MESSAGES}>
			{children}
		</NestedIntlProvider>
	);
}
