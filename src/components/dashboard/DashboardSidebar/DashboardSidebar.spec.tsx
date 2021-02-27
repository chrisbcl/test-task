import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { RootState } from '../../../store';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import DashboardMainPage from '../pages/DashboardMainPage/DashboardMainPage';
import DashboardSettingsPage from '../pages/DashboardSettingsPage/DashboardSettingsPage';

jest.mock('../pages/DashboardMainPage/DashboardMainPage');
jest.mock('../pages/DashboardSettingsPage/DashboardSettingsPage');

describe('<DashboardSidebar />', () => {
    it('displays the content associated with the link buttons', () => {
        (DashboardMainPage as jest.Mock).mockImplementation(() => <div>MainPage</div>);
        (DashboardSettingsPage as jest.Mock).mockImplementation(() => <div>SettingsPage</div>);

        const mockStore = configureMockStore<RootState>();
        const store = mockStore({
            auth: { isLoggedIn: true, userName: 'test', userId: 'id' },
            users: { users: {}, status: 'idle', error: null }
        });

        const { getByTestId, queryByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <DashboardLayout />
                </MemoryRouter>
            </Provider>
        );

        const mainLink = getByTestId('main-link');
        const settingsLink = getByTestId('settings-link');

        fireEvent.click(mainLink);
        expect(queryByText('MainPage')).toBeInTheDocument();
        expect(queryByText('SettingsPage')).not.toBeInTheDocument();

        fireEvent.click(settingsLink);
        expect(queryByText('SettingsPage')).toBeInTheDocument();
        expect(queryByText('MainPage')).not.toBeInTheDocument();
    });
});
