import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useUsersActions from '../../hooks/useUsersActions';
import { RootState } from '../../store';
import DashboardLayout from './DashboardLayout/DashboardLayout';

/**
 * Displays the Dashboard Layout
 * When mounted, fetches the github users information and store it with redux
 */
const Dashboard = () => {
    const status = useSelector(({ users }: RootState) => users.status);
    const { fetchUsers } = useUsersActions();

    useEffect(() => {
        if (status === 'idle') {
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <DashboardLayout />;
};

export default Dashboard;
