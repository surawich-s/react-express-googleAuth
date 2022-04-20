import _ from 'lodash';
import { FETCH_POST_COMMENTS, UPDATE_COMMENT } from '../constants/actionTypes';

const commentReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_POST_COMMENTS:
			return { ...state, ..._.mapKeys(action.payload, '_id') };
		case UPDATE_COMMENT:
			return { ...state, [action.payload._id]: action.payload };
		default:
			return state;
	}
};

export default commentReducer;
