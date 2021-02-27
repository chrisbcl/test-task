import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { bindActionCreators } from 'redux';

/**
 * Hook to dispatch the auth actions from redux
 */
const useAuthActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(authActions, dispatch);
};

export default useAuthActions;
