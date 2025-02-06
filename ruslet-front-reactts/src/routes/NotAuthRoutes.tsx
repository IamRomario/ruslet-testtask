import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../components/context/useAuth";

const NotAuthRoutes = () => {
    const {isAuth}=useAuth()
    const location = useLocation()
    return ( 

        <>
            {isAuth === false  ?
                <Outlet />
                :
                <Navigate to="/functions" state={{ from: location }} replace />
            }   
        </>  
     );
}
 
export default NotAuthRoutes;