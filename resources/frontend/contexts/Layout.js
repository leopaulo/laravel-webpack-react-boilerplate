import React, { useState, useEffect } from 'react';
import layoutReducer from './layout/layoutReducer';

let LayoutContext = React.createContext();
const LAYOUT_DEFAULT = {
	isLoading: true,
	isError: false,
	config: {},
};

export default function LayoutProvider({ children, type }) {
	let [layoutState, layoutDispatch] = React.useReducer(layoutReducer, LAYOUT_DEFAULT);
	let [isMounted, set_isMounted] = useState(false);

	useEffect(() => {
		if (isMounted === false) {
			set_isMounted(true);

			// You may replace with ajax call to set layout base on backend config
			layoutDispatch({
				type: 'SET_CONFIG',
				data: {
					type: type,
					lang: {
						key: 'lwr',
						default: 'en',
						available: 'en',
					},
				},
			});

			layoutDispatch({ type: 'SET_INIT' });
		}
	});

	return <LayoutContext.Provider value={{ layoutState, layoutDispatch }}>{children}</LayoutContext.Provider>;
}

export let LayoutConsumer = LayoutContext.Consumer;
