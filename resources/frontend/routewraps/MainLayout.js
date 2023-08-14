import React from 'react';
import LayoutProvider, { LayoutConsumer } from 'frontend/contexts/Layout';
import { NotificationProvider } from 'frontend/components/Notification';
import { LangProvider } from 'frontend/components/Language';
import withSuspense from 'frontend/utils/withSuspense';
import ErrorBoundary from 'frontend/components/ErrorBoundary';

let LoadingAnimation = withSuspense(
	React.lazy(function () {
		return import('frontend/components/LoadingAnimation');
	})
);

export default function MainLayout({ children }) {
	return (
		<LayoutProvider type="main">
			<LayoutConsumer>
				{({ layoutState }) =>
					layoutState.isLoading ? (
						<LoadingAnimation />
					) : layoutState.isError ? (
						'LayoutError'
					) : (
						<LangProvider config={layoutState.config.lang}>
							<NotificationProvider>
								<ErrorBoundary>{children}</ErrorBoundary>
							</NotificationProvider>
						</LangProvider>
					)
				}
			</LayoutConsumer>
		</LayoutProvider>
	);
}
