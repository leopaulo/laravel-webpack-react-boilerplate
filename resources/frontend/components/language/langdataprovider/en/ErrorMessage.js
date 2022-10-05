import React from 'react';
import NestedIntlProvider from 'frontend/components/NestedIntlProvider';

const MESSAGES = {
	ERR_00001: {
		title: 'Error',
		message: 'Something went wrong',
	},
};

export default function Provider({ children, ...props }) {
	return (
		<NestedIntlProvider {...props} messages={MESSAGES}>
			{children}
		</NestedIntlProvider>
	);
}
