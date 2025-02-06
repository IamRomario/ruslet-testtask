import "./style.css"
import useAuth from "../context/useAuth";
import LoadComponent from "./LoadComponent";


const Loader = (props:any) => {
    const {isLoaded}=useAuth()
    const { children } = props;
    return (         
        <div>
            {isLoaded&&(
                <LoadComponent/>
            )}            
            {children}       
        </div>            
     );
}
 
export default Loader;