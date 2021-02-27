import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import LoginForm from './components/authentication/LoginForm/LoginForm';
import configureMockStore from 'redux-mock-store';
import { RootState } from './store';
import { useGoogleAuthProvider } from './hooks/useGoogleAuthProvider';
import Dashboard from './components/dashboard/Dashboard';

jest.mock('./components/authentication/LoginForm/LoginForm');
jest.mock('./components/dashboard/Dashboard');
jest.mock('./hooks/useGoogleAuthProvider');

describe('<App />', () => {
    beforeEach(() => {
        (useGoogleAuthProvider as jest.MockedFunction<typeof useGoogleAuthProvider>).mockReturnValue({
            authenticating: false,
            signIn: jest.fn().mockReturnValue({}),
            signOut: jest.fn().mockReturnValue({})
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('User is not logged in', () => {
        it('redirects to the login route when accessing default route', async () => {
            (LoginForm as jest.Mock).mockImplementation(() => <div>LoginForm</div>);

            const mockStore = configureMockStore<RootState>();
            const store = mockStore({
                auth: { isLoggedIn: false, userName: null, userId: null },
                users: { users: {}, status: 'idle', error: null }
            });

            const { queryByText } = render(
                <MemoryRouter initialEntries={['/']}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </MemoryRouter>
            );

            await waitFor(() => {
                expect(queryByText('LoginForm')).toBeInTheDocument();
            });
        });
        it('displays login page when trying to access dashboard route', async () => {
            (LoginForm as jest.Mock).mockImplementation(() => <div>LoginForm</div>);
            (Dashboard as jest.Mock).mockImplementation(() => <div>Dashboard</div>);

            const mockStore = configureMockStore<RootState>();
            const store = mockStore({
                auth: { isLoggedIn: false, userName: null, userId: null },
                users: { users: {}, status: 'idle', error: null }
            });

            const { queryByText } = render(
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </MemoryRouter>
            );

            await waitFor(() => {
                expect(queryByText('LoginForm')).toBeInTheDocument();
                expect(queryByText('Dashboard')).not.toBeInTheDocument();
            });
        });
    });

    describe('User is logged in', () => {
        it('redirects to the dashboard route when accessing default route', async () => {
            (Dashboard as jest.Mock).mockImplementation(() => <div>Dashboard</div>);

            const mockStore = configureMockStore<RootState>();
            const store = mockStore({
                auth: { isLoggedIn: true, userName: 'Test', userId: 'id' },
                users: { users: {}, status: 'idle', error: null }
            });

            const { queryByText } = render(
                <MemoryRouter initialEntries={['/']}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </MemoryRouter>
            );

            await waitFor(() => {
                expect(queryByText('Dashboard')).toBeInTheDocument();
            });
        });
    });
});
