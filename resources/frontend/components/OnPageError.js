import React from 'react';
import { Alert, AlertTitle } from '@mui/lab';
import { LangDataProvider } from 'frontend/components/Language';
import { FormattedMessage } from 'react-intl';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PanToolIcon from '@mui/icons-material/PanTool';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import styles from './OnPageError.module';
import { isObject, isEmpty } from 'frontend/utils/dataType';
import { isPopup } from 'frontend/utils/window';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import flatten from 'flat';
import Container from '@mui/material/Container';

function getStatus(response) {
	let hasResponse = isObject(response) && !isEmpty(response);

	if (hasResponse) {
		return isEmpty(response.status) ? '200' : response.status;
	} else {
		return '200';
	}
}

function getData(response) {
	let hasResponse = isObject(response) && !isEmpty(response);

	if (hasResponse) {
		return isEmpty(response.data) ? {} : flatten(response.data);
	} else {
		return {};
	}
}

function goToSite(e) {
	if (isPopup()) {
		e.preventDefault();
		window.close();
	}
}

function ErrorIcon({ status }) {
	switch (status) {
		case '404':
			return <BrokenImageIcon />;
		case '401':
		case '403':
			return <PanToolIcon />;
		default:
			return <RemoveCircleIcon />;
	}
}

function ErrorButton({ errorCode,  useDefaultButton }) {
	switch (errorCode) {
		case '-2':
			//session timeout
			return (
				<Button
					color="secondary"
					component={'a'}
					variant="contained"
					href="/"
					onClick={goToSite}
					startIcon={<LockOpenIcon />}
				>
					<FormattedMessage id="relogin" />
				</Button>
			);
		default:
			return useDefaultButton ? (
				<Button
					component={'a'}
					variant="contained"
					href="/"
					onClick={goToSite}
					endIcon={<ArrowForwardIcon />}
					color="secondary"
				>
					<FormattedMessage id="goToSite" />
				</Button>
			) : null;
	}
}

export default function OnPageError({ response, useDefaultButton }) {
	let errorCode = response.error.code;
	let statusCode = getStatus(response);

	return (
		<LangDataProvider category="errorcomponent">
			<LangDataProvider category="errormessage">
				<Alert severity="error" icon={<ErrorIcon status={statusCode} />} classes={{ message: styles.message }}>
					<AlertTitle>
						<FormattedMessage id={`${errorCode}.title`} values={getData(response)} />
					</AlertTitle>
					<FormattedMessage id={`${errorCode}.message`} values={getData(response)} />
					{response.requestID && (
						<div className={styles.refNo}>
							<FormattedMessage id="refNo" />: {response.requestID}
						</div>
					)}
					<div className={styles.buttons}>
						<ErrorButton
							errorCode={errorCode}
							values={getData(response)}
							useDefaultButton={useDefaultButton}
						/>
					</div>
				</Alert>
			</LangDataProvider>
		</LangDataProvider>
	);
}

function getWindowErrorCode(response) {
	response = response || window.response;
	let hasResponse = isObject(response) && !isEmpty(response);

	if (hasResponse) {
		if (response.result === true) {
			return null;
		} else {
			let hasErrorCode = isObject(response.error) && !isEmpty(response.error.code);

			return hasErrorCode ? response.error.code : false;
		}
	} else {
		return false;
	}
}

export function ErrorPage({ fallback, response, useDefaultButton }) {
	response = response || window.response;
	useDefaultButton = useDefaultButton !== undefined ? useDefaultButton : true;
	let errorCode = getWindowErrorCode(response);

	if (!errorCode) {
		if (!fallback) {
			window.location = '/error/notfound';
		} else {
			return fallback;
		}
	} else {
		return (
			<div className={styles.parent}>
				<Container className={styles.container} maxWidth="sm">
					<OnPageError response={response} useDefaultButton={useDefaultButton} />
				</Container>
			</div>
		);
	}
}
