import React from 'react';
import colorReducer from './color/colorReducer';
import { getCookie } from 'frontend/utils/cookie';

let ColorContext = React.createContext();

export default function ColorProvider({ children }) {
	let [colorState, colorDispatch] = React.useReducer(colorReducer, {
		active: getCookie('lwr_mode') || 'light',
	});

	return (
		<ColorContext.Provider
			value={{
				colorState,
				colorDispatch,
			}}
		>
			{children}
		</ColorContext.Provider>
	);
}

export let ColorConsumer = ColorContext.Consumer;
