import { CssBaseline } from '@material-ui/core';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import useAuthActions from './hooks/useAuthActions';
import { GoogleSignInResponse, useGoogleAuthProvider } from './hooks/useGoogleAuthProvider';
import { RootState } from './store';
import classes from './App.module.css';
import Loading from './components/Layout/Loading/Loading';

const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const LoginForm = lazy(() => import('./components/authentication/LoginForm/LoginForm'));

/**
 * Entry point of the Application
 * Provides the main routing points with /dashboard being only accessible when the user
 * is logged in
 */
const App = () => {
    const { logIn } = useAuthActions();
    const isLoggedIn = useSelector(({ auth }: RootState) => auth.isLoggedIn);

    const onGoogleSuccess = (response: GoogleSignInResponse) => {
        const userName = response.user.getBasicProfile().getName();
        const userId = response.user.getId();

        logIn(userId, userName);
    };

    const { authenticating } = useGoogleAuthProvider({ onSignInSuccess: onGoogleSuccess });

    const HomeRouteComponent = isLoggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/login' />;
    const DashboardRouteComponent = isLoggedIn ? <Dashboard /> : <Redirect to='/login' />;
    const LoginRouteComponent = isLoggedIn ? <Redirect to='/dashboard' /> : <LoginForm />;

    return (
        <div className={classes.App}>
            <CssBaseline />
            <Router>
                {authenticating ? (
                    <div className={classes.Loading}>
                        <Loading>Authenticating...</Loading>
                    </div>
                ) : (
                    <>
                        <Header />
                        <Suspense fallback={<Loading>Loading...</Loading>}>
                            <Switch>
                                <Route path='/login'>{LoginRouteComponent}</Route>
                                <Route path='/dashboard'>{DashboardRouteComponent}</Route>
                                <Route path='/'>{HomeRouteComponent}</Route>
                            </Switch>
                        </Suspense>
                    </>
                )}
            </Router>
        </div>
    );
};

export default App;
