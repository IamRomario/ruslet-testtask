import { Routes, Route, useLocation} from "react-router-dom"
import {AnimatePresence} from "framer-motion"
import SignIn from "../components/auth/SignIn";
import AuthRoutes from "./AuthRoutes";
import NotAuthRoutes from "./NotAuthRoutes";
import Function from "../pages/Function";

const AppRoutes = () => {
    const location=useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>             
                <Route element={<NotAuthRoutes/>}>
                    <Route path="/" element={<SignIn/>}/>
                </Route>                 
                <Route element={<AuthRoutes />}>                    
                    <Route path="/functions" element={<Function/>}/> 
                </Route>              
            </Routes>
        </AnimatePresence> 
    );
}
 
export default AppRoutes;