import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../components/context/useAuth";

const PrivateRoutes = () => {
    const {isAuth}=useAuth()
    const location = useLocation()
    return ( 
        <>
            {isAuth === true  ?
                <Outlet />
                :
                <Navigate to="/" state={{ from: location }} replace />
            }   
        </>          
);
}
 
export default PrivateRoutes;