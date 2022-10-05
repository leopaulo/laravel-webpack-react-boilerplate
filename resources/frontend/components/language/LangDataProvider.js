import React, { Suspense, lazy } from 'react';
import { LangConsumer } from 'frontend/contexts/Language';
import LoadingAnimation from 'frontend/components/LoadingAnimation';

const PROVIDERS = {
	errormessage: {
		en: lazy(() => import('./langdataprovider/en/ErrorMessage')),
	},
	home: {
		en: lazy(() => import('./langdataprovider/en/Home')),
	},
	errorcomponent: {
		en: lazy(() => import('./langdataprovider/en/ErrorComponent')),
	},
};

export default function LangIntlProvider({ category, children, fallback }) {
	return (
		<Suspense fallback={fallback || <LoadingAnimation />}>
			<LangConsumer>
				{({ langState }) => {
					const Provider = PROVIDERS[category][langState.active];
					return <Provider locale={langState.active}>{children}</Provider>;
				}}
			</LangConsumer>
		</Suspense>
	);
}
