import { GitHubUser } from '../../interfaces/user';
import { UserAction, UserActionFetchAll, UserActionFetchAllFail, UserActionType, UsersState } from './types';

const initialState: UsersState = {
    users: {},
    status: 'idle',
    error: null
};

const fetchUsersStart = (state: UsersState): UsersState => {
    return { ...state, status: 'loading', error: null };
};

const fetchUsers = (state: UsersState, { payload: allUsers }: UserActionFetchAll): UsersState => {
    console.log(allUsers);
    const users = allUsers.reduce<{ [id: string]: GitHubUser }>((acc, user) => {
        acc[user.username] = user;
        return acc;
    }, {});
    console.log(users);
    return { ...state, users, status: 'succeeded', error: null };
};

const fetchUsersFail = (state: UsersState, { payload: error }: UserActionFetchAllFail): UsersState => {
    return { ...state, error, status: 'failed' };
};

const usersReducer = (state: UsersState = initialState, action: UserAction): UsersState => {
    switch (action.type) {
        case UserActionType.FETCH_USERS_START: {
            return fetchUsersStart(state);
        }
        case UserActionType.FETCH_USERS_SUCCESS: {
            return fetchUsers(state, action);
        }
        case UserActionType.FETCH_USERS_FAIL: {
            return fetchUsersFail(state, action);
        }
        default:
            return state;
    }
};

export default usersReducer;
