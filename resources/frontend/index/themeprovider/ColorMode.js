import React, { useEffect } from 'react';

export default function ColorMode({ colorState }) {
	useEffect(() => {
		if (colorState.active == 'dark') {
			document.body.classList.remove('cas_light');
			document.body.classList.add('cas_dark');
		} else {
			document.body.classList.remove('cas_dark');
			document.body.classList.add('cas_light');
		}
	});

	return <></>;
}
