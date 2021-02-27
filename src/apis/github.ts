import axios from 'axios';

export interface GithubUserResponse {
    login: string;
    id: number;
    avatar_url: string;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
}

export default axios.create({
    baseURL: 'https://api.github.com'
});
