import { motion as m} from "framer-motion"

const Animation = (props:any) => {
    const { children } = props;
    return (
        <m.div
            initial={{width:0, opacity:0}}
            animate={{width:"100vw", opacity:1}}
            transition={{duration: 0.8, type:"spring"}} 
        >
            {children}   
        </m.div>       
    );
}
 
export default Animation;