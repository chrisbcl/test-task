export interface GitHubUser {
    username: string;
    avatarURL: string;
    bio: string | null;
    numFollowers: number;
    numFollowing: number;
    numPublicRepos: number;
    numPublicGists: number;
}
