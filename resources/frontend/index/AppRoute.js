import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import RouteWrap from 'frontend/routewraps/RouteWrap';
import withSuspense from 'frontend/utils/withSuspense';

let MainLayout = withSuspense(
	React.lazy(function () {
		return import('frontend/routewraps/MainLayout');
	})
);

let Home = withSuspense(
	React.lazy(function () {
		return import('frontend/pages/Home');
	})
);

let ErrorPage = withSuspense(
	React.lazy(function () {
		return import('frontend/pages/ErrorPage');
	})
);

export default function AppRoute() {
	return (
		<BrowserRouter basename={process.env.APP_ROOT || '/'}>
			<Switch>
				<RouteWrap wrappers={[{ component: MainLayout }]} exact path="/" component={Home} />
				<RouteWrap wrappers={[{ component: MainLayout }]} exact path="*" component={ErrorPage} />
			</Switch>
		</BrowserRouter>
	);
}
