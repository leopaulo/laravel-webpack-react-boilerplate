import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import styles from './ThemeProvider.module';
import ColorProvider, { ColorConsumer } from 'frontend/contexts/Color';
import ColorMode from './themeprovider/ColorMode';

function getColorSet(variant) {
	return variant == 'dark'
		? {
				colors_primary: styles.colors_dmode_primary,
				colors_pLight: styles.colors_dmode_pLight,
				colors_pDark: styles.colors_dmode_pDark,
				colors_pText: styles.colors_dmode_pText,
				colors_secondary: styles.colors_dmode_secondary,
				colors_sLight: styles.colors_dmode_sLight,
				colors_sDark: styles.colors_dmode_sDark,
				colors_sText: styles.colors_dmode_sText,
		  }
		: {
				colors_primary: styles.colors_primary,
				colors_pLight: styles.colors_pLight,
				colors_pDark: styles.colors_pDark,
				colors_pText: styles.colors_pText,
				colors_secondary: styles.colors_secondary,
				colors_sLight: styles.colors_sLight,
				colors_sDark: styles.colors_sDark,
				colors_sText: styles.colors_sText,
		  };
}

function createAppTheme(variant) {
	let colors = getColorSet(variant);

	return createTheme({
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
				light: colors.colors_sLight,
				main: colors.colors_secondary,
				dark: colors.colors_sDark,
				contrastText: colors.colors_sText,
			},
			primary: {
				light: colors.colors_pLight,
				main: colors.colors_primary,
				dark: colors.colors_pDark,
				contrastText: colors.colors_pText,
			},
			background: {
				default: 'rgba(0,0,0,0)',
			},
			text: {
				primary: colors.colors_pText,
				secondary: colors.colors_sText,
			},
		},
	});
}

export default function ThemeProvider({ children }) {
	return (
		<ColorProvider>
			<ColorConsumer>
				{({ colorState }) => (
					<>
						<ColorMode colorState={colorState} />
						<MuiThemeProvider theme={createAppTheme(colorState.active)}>
							<CssBaseline />
							{children}
						</MuiThemeProvider>
					</>
				)}
			</ColorConsumer>
		</ColorProvider>
	);
}
