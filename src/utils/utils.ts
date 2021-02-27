import { GithubUserResponse } from '../apis/github';
import { GitHubUser } from '../interfaces/user';

/**
 * Map github user response from the API to GitHubUser interface
 */
export const githubUserResponseToUser = ({
    bio,
    avatar_url,
    followers,
    following,
    login,
    public_gists,
    public_repos
}: GithubUserResponse): GitHubUser => ({
    username: login,
    avatarURL: avatar_url,
    bio,
    numFollowers: followers,
    numFollowing: following,
    numPublicGists: public_gists,
    numPublicRepos: public_repos
});
