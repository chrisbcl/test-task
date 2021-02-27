import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { usersActions } from '../store';

/**
 * Hook to dispatch the users actions from redux
 */
const useUsersActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(usersActions, dispatch);
};

export default useUsersActions;
