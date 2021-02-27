import github, { GithubUserResponse } from '../../apis/github';
import { githubUserResponseToUser } from '../../utils/utils';
import {
    UserThunkAction,
    UserActionFetchAll,
    UserActionType,
    UserActionFetchAllFail,
    UserActionFetchAllStart
} from './types';

/**
 * Fetch users action creator
 */
export const fetchUsers = (): UserThunkAction<
    UserActionFetchAll | UserActionFetchAllStart | UserActionFetchAllFail
> => async (dispatch) => {
    dispatch({ type: UserActionType.FETCH_USERS_START });

    try {
        const username1 = process.env.REACT_APP_MAIN_USER;
        const username2 = process.env.REACT_APP_SETTINGS_USER;

        if (!username1 || !username2) {
            throw new Error('Invalid Users');
        }

        const { data: user1 } = await github.get<GithubUserResponse>(`/users/${username1}`);
        const { data: user2 } = await github.get<GithubUserResponse>(`/users/${username2}`);

        const users = [user1, user2].map((user) => githubUserResponseToUser(user));

        dispatch({ type: UserActionType.FETCH_USERS_SUCCESS, payload: users });
    } catch (error) {
        dispatch({ type: UserActionType.FETCH_USERS_FAIL, payload: error.message });
    }
};
