import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useAuthActions from '../../../hooks/useAuthActions';
import { useGoogleAuthProvider } from '../../../hooks/useGoogleAuthProvider';
import { RootState } from '../../../store';
import classes from './Header.module.css';

/**
 * Header of the application.
 * Displays the logout button when the user is logged in
 */
const Header = () => {
    const { logOut } = useAuthActions();
    const isLoggedIn = useSelector(({ auth }: RootState) => auth.isLoggedIn);

    const onLogOutClick = async () => {
        await signOut();
        logOut();
    };

    const { signOut } = useGoogleAuthProvider();

    return (
        <div className={classes.Header}>
            {isLoggedIn ? (
                <Button className={classes.LogoutButton} variant='contained' color='secondary' onClick={onLogOutClick}>
                    Log Out
                </Button>
            ) : null}
        </div>
    );
};

export default Header;
