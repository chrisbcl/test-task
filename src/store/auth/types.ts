export enum AuthActionType {
    LOG_IN = 'LOG_IN',
    LOG_OUT = 'LOG_OUT'
}

interface AuthBaseAction<T extends AuthActionType = AuthActionType> {
    type: T;
}

export interface AuthActionLogIn extends AuthBaseAction<AuthActionType.LOG_IN> {
    payload: {
        userId: string;
        userName: string;
    };
}

export type AuthActionLogOut = AuthBaseAction<AuthActionType.LOG_OUT>;

export type AuthAction = AuthActionLogIn | AuthActionLogOut;

export interface AuthState {
    isLoggedIn: boolean | null;
    userId: string | null;
    userName: string | null;
}
