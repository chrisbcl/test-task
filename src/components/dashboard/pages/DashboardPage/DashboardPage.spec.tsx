import { render } from '@testing-library/react';
import { GitHubUser } from '../../../../interfaces/user';
import DashboardPage from './DashboardPage';

describe('<DashboardPage />', () => {
    it('displays the user props and title on the screen', () => {
        const user: GitHubUser = {
            username: 'testuser',
            avatarURL: 'avatar',
            bio: 'bio',
            numFollowers: 1,
            numFollowing: 2,
            numPublicGists: 3,
            numPublicRepos: 4
        };

        const { getByText } = render(<DashboardPage user={user} title={'title'} />);

        expect(getByText('title')).toBeInTheDocument();
        expect(getByText('testuser')).toBeInTheDocument();
        expect(getByText('bio')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
        expect(getByText('4')).toBeInTheDocument();
    });
});
