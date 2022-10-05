import React, { Suspense } from 'react';
import LoadingAnimation from 'frontend/components/LoadingAnimation';

export default function withSuspense(Component, fallback) {
	return function WithSuspense(props) {
		return (
			<Suspense fallback={fallback ? fallback : <LoadingAnimation />}>
				<Component {...props} />
			</Suspense>
		);
	};
}
