import {FC,  useState} from "react";
import Authorize from "./Authorize";
import './style.css'
import AuthService from "../../services/auth/AuthService";
import {AnimatePresence, motion as m} from "framer-motion"
import useAuth from "../context/useAuth";
import { useNavigate } from "react-router-dom";




const SignIn: FC = () => {
    const {login,setLoaded}=useAuth()
    const [loginShow,setLoginShow]=useState<boolean>(true)
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")   
    const [mainError,setMainError]=useState<string>("");
    const [emailError,setEmailError]=useState<string>("");
    const [passwordError,setPasswordError]=useState<string>("");
    
    //#region Extentions: Password-show-hide 
    function showPassword(e:any){
        var input = document.getElementById('password') as HTMLInputElement
        var image = document.getElementById('password-hide-show') as HTMLDivElement
        if(input.type === 'password'){
            input.type = "text"
            image.classList.remove("password-hide-image");
            image.classList.add("password-show-image");
        }else{
            input.type = "password"
            image.classList.remove("password-show-image");
            image.classList.add("password-hide-image");
        }
    }    
    //#endregion
    
    //#region Extentions: work-with-errors
    function clearErrors(){
        setMainError("")
        setEmailError("")
        setPasswordError("")
    }
    //Обновление полученных ошибок
    async function updateErrors(errors:any) {
        if (errors.Exception!=null) setMainError(errors.Exception)
            else setMainError("")
        if (errors.Email!=null) setEmailError(errors.Email)
            else setEmailError("")
        if (errors.Password!=null) setPasswordError(errors.Password)
        else setPasswordError("")             
    } 
    //#endregion
                
    //Проверка возмоэности авторизации
    async function signInCheck(e:any){
        e.preventDefault();        
        clearErrors();        
        var ok:boolean=true;
        if (email.length===0)
        {  ok=false; setEmailError("Поле должно быть заполнено") }
        if (password.length===0)
        {  ok=false; setPasswordError("Поле должно быть заполнено") }
        if (ok)
        {
            await setLoaded(true);
            await signIn(false);
        }    
    }            
    //Авторизация
    async function signIn(finaly:boolean) {
        try
        {           
            if (!finaly)
            await AuthService.signin(email,password,
                async (suc) => { 
                    await setLoaded(false)
                    if (suc.status==200)
                        {
                            if (suc.data !=null)
                            {
                                login(suc.data)                                    
                            }
                        }
                },
                async (err)=>{
                    await setLoaded(false)
                    if (err.response!=null&&err.response.status==409) 
                    {   
                        updateErrors(err.response.data.errors);
                    } 
                })
        }
        catch (e) {}
        await setLoaded(false)
    }       
    return ( 
        <Authorize>
            <h1 className="title-1">— Login —</h1>
            <AnimatePresence>
                {loginShow && (
                    <m.div
                        initial={{ opacity: 0, y: 400, scale: 0.5 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 400 }}
                        transition={{ duration: 0.6 }}>
                        <ul className="content-list-auth">
                            <li className="content-list__item">
                                <div className="field email-field">
                                    <span className="error" style={{justifyContent:"center", marginBottom:5}}>
                                        <i className="bx bx-error-circle error-icon" />
                                        <p className="error-text" style={{ textAlign: "right" }}>{mainError}</p>
                                    </span>
                                    <div className="input-field">
                                        <input
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            type="text"
                                            placeholder="example@yandex.ru" className="email" />
                                    </div>
                                    <span className="error">
                                        <i className="bx bx-error-circle error-icon" />
                                        <p className="error-text">{emailError}</p>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="field create-password">
                                    <div className="input-field">
                                        <input
                                            onChange={e => setPassword(e.target.value)}
                                            value={password}
                                            id="password"
                                            type="password"
                                            placeholder="Password" className="password" />
                                        <i className="bx bx-hide show-hide" onClick={e => showPassword(e)}>
                                            <div id="password-hide-show" className="password-image password-hide-image" />
                                        </i>
                                    </div>
                                    <span className="error">
                                        <i className="bx bx-error-circle error-icon" />
                                        <p className="error-text">{passwordError}</p>
                                    </span>
                                </div>                                
                            </li>
                            <li className="content-list__item">
                                <button className="btn" 
                                    onClick={ async (e) => await signInCheck(e)}>Вход</button>
                            </li>
                        </ul>
                    </m.div>
                )}
            </AnimatePresence>
        </Authorize>                   
     );
}
 
export default SignIn;