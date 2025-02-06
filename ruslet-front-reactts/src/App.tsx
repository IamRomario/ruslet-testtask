import { FC,useEffect } from 'react';
import {BrowserRouter as Router} from "react-router-dom"
import AppRoutes from './routes/AppRoutes';
import "./styles/main.css"
import useAuth from './components/context/useAuth';


const App: FC = () => {
  const {login,setLoaded}=useAuth()
  useEffect(()=>{
    const token=localStorage.getItem("token")
    if (token!=null)
      {        
        setLoaded(true)
        login(token)
        setLoaded(false)
      }    
  },[])
  return (
    <div>
      <div className="App">      
      <Router>
        <AppRoutes/> 
      </Router>      
    </div>
    </div>
  );
}

export default App;
