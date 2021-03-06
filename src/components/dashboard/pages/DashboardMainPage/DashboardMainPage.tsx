import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import Loading from '../../../Layout/Loading/Loading';
import DashboardPage from '../DashboardPage/DashboardPage';

/**
 * Dashboard page for the main content of the dashboard.
 * Gets the user information from the redux store and displays it
 */
const DashboardMainPage = () => {
    const { users, error, status } = useSelector(({ users }: RootState) => ({
        users: users.users,
        error: users.error,
        status: users.status
    }));

    if (status === 'loading' || status === 'idle') {
        return <Loading>Loading...</Loading>;
    }

    if (status === 'failed') {
        return <div>{error}</div>;
    }

    const user = users[process.env.REACT_APP_MAIN_USER!];

    return <DashboardPage user={user} title='Dashboard' />;
};

export default DashboardMainPage;
