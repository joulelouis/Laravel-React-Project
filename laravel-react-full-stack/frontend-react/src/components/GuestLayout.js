import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function GuestLayout() {
    const {token} = useStateContext();
    
    if(token) {
        return <Navigate to="/" />
    }

    return(
        <div>
            <div>
                {/* //!render login or signup */}
                {/* //!outlet will be the place where we will render the child route */}
                <Outlet />
            </div>
        </div>
    )
};