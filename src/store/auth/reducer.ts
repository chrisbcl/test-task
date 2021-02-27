import { AuthAction, AuthActionType, AuthState } from './types';

const initialState: AuthState = {
    isLoggedIn: null,
    userId: null,
    userName: null
};

/**
 * Authentication reducer
 * @param state
 * @param action
 */
const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOG_IN: {
            const {
                payload: { userId, userName }
            } = action;
            return { ...state, isLoggedIn: true, userId, userName };
        }
        case AuthActionType.LOG_OUT: {
            return { ...state, isLoggedIn: false, userId: null, userName: null };
        }
        default:
            return state;
    }
};

export default authReducer;
