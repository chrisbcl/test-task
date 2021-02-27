import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer
});

export default rootReducer;
