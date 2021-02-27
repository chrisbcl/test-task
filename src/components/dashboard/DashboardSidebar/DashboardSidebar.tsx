import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { DashboardRounded, Settings } from '@material-ui/icons';
import { useState } from 'react';
import classes from './DashboardSidebar.module.css';

/**
 * Dashboard sidebar with the available page content links
 */
const DashboardSidebar = () => {
    let { url } = useRouteMatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div className={classes.DashboardSidebar}>
            <List component='nav' aria-label='main mailbox folders'>
                <Link data-testid='main-link' to={`${url}/main`}>
                    <ListItem button onClick={() => onListItemClick(0)} selected={selectedIndex === 0}>
                        <ListItemAvatar>
                            <Avatar>
                                <DashboardRounded />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                </Link>
                <Link data-testid='settings-link' to={`${url}/settings`}>
                    <ListItem button onClick={() => onListItemClick(1)} selected={selectedIndex === 1}>
                        <ListItemAvatar>
                            <Avatar>
                                <Settings />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Settings' />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
};

export default DashboardSidebar;
