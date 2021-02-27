import DashboardHeader from '../DashboardHeader/DashboardHeader';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import classes from './Dashboard.module.css';
import DashboardContent from '../DashboardContent/DashboardContent';

/**
 * Dashboard Layout with the header, sidebar and content
 */
const DashboardLayout = () => {
    return (
        <div className={classes.Dashboard}>
            <DashboardHeader />
            <DashboardSidebar />
            <DashboardContent />
        </div>
    );
};

export default DashboardLayout;
