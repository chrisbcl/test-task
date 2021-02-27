import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import classes from './DashboardHeader.module.css';

/**
 * Dashboard Header with the logged in user name
 */
const DashboardHeader = () => {
    const { userName } = useSelector(({ auth }: RootState) => ({ userName: auth.userName }));

    return (
        <div className={classes.DashboardHeader}>
            <Typography variant='h4' component='h5'>
                Dashboard
            </Typography>
            <span className={classes.User}>{userName}</span>
        </div>
    );
};

export default DashboardHeader;
