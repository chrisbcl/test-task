import { Button, Paper } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuthActions from '../../../hooks/useAuthActions';
import { GoogleSignInResponse, useGoogleAuthProvider } from '../../../hooks/useGoogleAuthProvider';
import classes from './LoginForm.module.css';

/**
 * Login form with the following authentication options available:
 *  - Google OAuth
 */
const LoginForm = () => {
    const { logIn } = useAuthActions();
    const history = useHistory();
    const [error, setError] = useState<string | null>(null);

    const onGoogleSuccess = (response: GoogleSignInResponse) => {
        const userName = response.user.getBasicProfile().getName();
        const userId = response.user.getId();

        setError(null);
        logIn(userId, userName);
        history.push('/');
    };

    const onGoogleFailure = (error: string) => {
        setError(error);
    };

    const { signIn } = useGoogleAuthProvider({ onSignInSuccess: onGoogleSuccess });

    const onLogInClick = async () => {
        try {
            await signIn();
        } catch (error) {
            onGoogleFailure(error.message);
        }
    };

    return (
        <div className={classes.Login}>
            <Paper className={classes.Paper} elevation={3}>
                <Button size='medium' color='primary' variant='contained' autoCapitalize='' onClick={onLogInClick}>
                    Log In With Google
                </Button>
                {error && <p>{error}</p>}
            </Paper>
        </div>
    );
};

export default LoginForm;
