import { CircularProgress } from '@material-ui/core';
import { ReactNode } from 'react';
import classes from './Loading.module.css';

interface LoadingProps {
    // label component
    children?: ReactNode;
}

/**
 * Loading component to display a spinner with a optional label component
 */
const Loading = ({ children }: LoadingProps) => {
    return (
        <div className={classes.Loading}>
            <CircularProgress />
            {children ? <div className={classes.Text}>{children}</div> : null}
        </div>
    );
};

export default Loading;
