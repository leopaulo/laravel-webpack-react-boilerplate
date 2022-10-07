import immer from 'immer';

export default immer((draft, action) => {
	switch (action.type) {
		case 'SET':
			draft.active = action.active;
			break;
	}
});
