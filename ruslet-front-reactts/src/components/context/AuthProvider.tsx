import { createContext, useState } from "react";

type AuthContextType = {  
  isAuth: boolean;
  login:(response:string) =>void;
  logout: ()=>void;
  isLoaded:boolean;
  setLoaded:(bool:boolean)=>void;
};


const AuthContext = createContext<AuthContextType>({  
  isAuth: false,
  login:()=>{},
  logout:()=>{},
  isLoaded:false,
  setLoaded:()=>{}
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  async function login(response:string){
    localStorage.setItem('token', response)
    setAuth(true)
  }
  async function logout(){
    localStorage.removeItem('token')
    setAuth(false) 
  }
  return (
    <AuthContext.Provider value={{ isAuth,login,logout,isLoaded,setLoaded}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;