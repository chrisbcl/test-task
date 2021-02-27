import { AuthActionLogIn, AuthActionLogOut, AuthActionType } from './types';

/**
 * Log in action creator
 * @param userId
 * @param userName
 */
export const logIn = (userId: string, userName: string): AuthActionLogIn => ({
    type: AuthActionType.LOG_IN,
    payload: { userId, userName }
});

/**
 * Log out action creator
 */
export const logOut = (): AuthActionLogOut => ({
    type: AuthActionType.LOG_OUT
});
