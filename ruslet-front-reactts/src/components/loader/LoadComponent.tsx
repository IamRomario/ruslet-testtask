import ReactLoading from "react-loading";
import "./style.css"
import { motion as m} from "framer-motion"
import { controller } from "../../http/client"
import { useCallback, useEffect } from "react";

const LoadComponent = () => {
    const escFunction = useCallback((event:any) => {
        if (event.key === "Escape") {
            controller.abort()
        }
      }, []);
    
      useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    
        return () => {
          document.removeEventListener("keydown", escFunction, false);
        };
      }, [escFunction]);
    return ( 
        <div className="loader-background">
            <m.div className="loader"
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.3}}>
                    <ReactLoading type="spin" color="#5c62ec" height={150} width={100}/>
                    <p className="exit-button" onClick={()=>controller.abort()}>X</p>
            </m.div> 
        </div>
     );
}
 
export default LoadComponent;