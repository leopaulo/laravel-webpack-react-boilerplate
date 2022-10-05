import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import styles from './ThemeProvider.module';

const THEME = createTheme({
	spacing: parseInt(styles.main_standardSpace),
	breakpoints: {
		// Define custom breakpoint values.
		// These will apply to Material-UI components that use responsive
		// breakpoints, such as `Grid` and `Hidden`. You can also use the
		// theme breakpoint functions `up`, `down`, and `between` to create
		// media queries for these breakpoints
		values: {
			xs: 0,
			sm: parseInt(styles.main_mobile),
			md: parseInt(styles.main_tablet),
			lg: parseInt(styles.main_desktop),
			xl: parseInt(styles.main_bigDesktop),
		},
	},
	typography: {
		htmlFontSize: 10,
	},
	palette: {
		secondary: {
			light: styles.colors_spLight,
			main: styles.colors_secondary,
			dark: styles.colors_sDark,
			contrastText: styles.colors_sText,
		},
		primary: {
			light: styles.colors_pLight,
			main: styles.colors_primary,
			dark: styles.colors_pDark,
			contrastText: styles.colors_pText,
		},
		background: {
			default: 'rgba(0,0,0,0)',
		},
		text: {
			primary: styles.colors_pText,
			secondary: styles.colors_sText,
		},
	}
});

export default function ThemeProvider({ children }) {
	return (
		<MuiThemeProvider theme={THEME}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
