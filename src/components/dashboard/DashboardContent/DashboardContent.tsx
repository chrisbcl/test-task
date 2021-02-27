import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import DashboardMainPage from '../pages/DashboardMainPage/DashboardMainPage';
import DashboardSettingsPage from '../pages/DashboardSettingsPage/DashboardSettingsPage';
import classes from './DashboardContent.module.css';

/**
 * Dashboard Layout Content information divided by pages accessible with
 * the routing paths
 */
const DashboardContent = () => {
    let { path } = useRouteMatch();

    return (
        <div className={classes.DashboardContent}>
            <Switch>
                <Route path={`${path}/main`}>
                    <DashboardMainPage />
                </Route>
                <Route path={`${path}/settings`}>
                    <DashboardSettingsPage />
                </Route>
                <Route path={path}>
                    <Redirect to={`${path}/main`} />
                </Route>
            </Switch>
        </div>
    );
};

export default DashboardContent;
