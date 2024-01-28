import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {


    const {user, token} = useStateContext();  
    
    //! if the user has no access token, they will be redirected to the login page  
    if(!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (event) => {
        event.preventDefault();
    }

    return(
        <div id="defaultLayout">
            {/* //!sidebar */}
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            
            <div className="content">
                {/* //!navbar */}
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}   
                        <a href="#" onClick={onLogout} className="btn-logout" ></a>
                    </div>

                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            
        </div>
    )
};