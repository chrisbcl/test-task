import { Action } from 'redux';
import { GitHubUser } from '../../interfaces/user';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../types';

export enum UserActionType {
    FETCH_USERS_START = 'FETCH_USERS_START',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAIL = 'FETCH_USERS_FAIL'
}

export interface UserActionFetchAll extends UserBaseAction<UserActionType.FETCH_USERS_SUCCESS> {
    payload: GitHubUser[];
}

export type UserActionFetchAllStart = UserBaseAction<UserActionType.FETCH_USERS_START>;

export interface UserActionFetchAllFail extends UserBaseAction<UserActionType.FETCH_USERS_FAIL> {
    payload: string;
}

interface UserBaseAction<T extends UserActionType = UserActionType> extends Action {
    type: T;
}

export type UserAction = UserActionFetchAllStart | UserActionFetchAll | UserActionFetchAllFail;

export type UserThunkAction<A extends UserAction = UserAction, ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    A
>;

export interface UsersState {
    users: { [id: string]: GitHubUser };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
