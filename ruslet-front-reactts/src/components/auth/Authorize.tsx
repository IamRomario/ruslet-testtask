import Animation from "../../utils/Animation";

const Authorize = (props:any) => {
    const { children } = props;    
    return ( 
        <Animation>
            <main className="section">
                <div className="container">
                    <form className="form">
                        {children}
                    </form>
                </div>
            </main>
        </Animation>        
     );
}
 
export default Authorize;