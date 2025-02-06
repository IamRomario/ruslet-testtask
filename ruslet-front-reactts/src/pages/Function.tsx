import Authorize from "../components/auth/Authorize";
import { motion as m} from "framer-motion"
import { useState,useEffect } from "react";
import '../components/auth/style.css'
import {City} from "../services/calculate/model/City"
import {Subject} from "../services/calculate/model/Subject"
import useAuth from "../components/context/useAuth";
import CalcService from "../services/calc/CalcService";


const Function = () => {

    const {setLoaded}=useAuth()
    const [subjects,setSubjects]=useState<Subject[]>([])
    const [selectedSubject,setSelectedSubject] = useState<Subject>()
    const [cities,setCities]=useState<City[]>([])
    const [selectedCity,setSelectedCity] = useState<City>()
    
    const [snowPressure,setSnowPressure]=useState<number>(0)
    const [windPressure,setWindPressure]=useState<number>(0)
    const [temperatureWarm,setTemperatureWarm]=useState<number>(0)
    const [temperatureCold,setTemperatureCold]=useState<number>(0)
    

    const [mainError,setMainError] = useState<string>("")    


    useEffect(()=>{
        (async () => {
            await GetSubjects()
          })()
    },[])
    async function setMain(city:City) {
        setSnowPressure(city.snowPressure)
        setWindPressure(city.windPressure)
        setTemperatureWarm(city.temperatureWarm)
        setTemperatureCold(city.temperatureCold)
    }
    async function GetSubjects(){   
        await setLoaded(true);
        try
        {           
            await CalcService.getSubjectsAsync(
                async (suc) => { 
                    await setLoaded(false)
                    if (suc.status==200)
                        {
                            if (suc.data !=null)
                            {
                                setSubjects(suc.data)
                                setSelectedSubject(suc.data[0])
                                await GetSities(suc.data[0].id)
                            }
                        }
                },
                async (err)=>{
                    await setLoaded(false)
                    if (err.response!=null&&err.response.status==409) 
                    {   
                        alert(err.response.data.title)
                        setMainError(err.response.data.title);
                    } 
                })
        }
        catch (e) {}                      
    }
    async function GetSities(subjectId:number){   
        await setLoaded(true);
        try
        {           
            await CalcService.getCitiesAsync(subjectId,
                async (suc) => { 
                    await setLoaded(false)
                    if (suc.status==200)
                        {
                            if (suc.data !=null)
                            {
                                setCities(suc.data)
                                setSelectedCity(suc.data[0]) 
                                await setMain(suc.data[0])                                                            
                            }
                        }
                },
                async (err)=>{
                    await setLoaded(false)
                    if (err.response!=null&&err.response.status==409) 
                    {   
                        setMainError(err.response.data.title);
                    } 
                })
        }
        catch (e) {}                      
    }
    async function ChangeSubject(e:any){
        e.preventDefault();
        const num=e.target.value;
        await setSelectedSubject(subjects[num])
        await GetSities(subjects[num].id)
    }
    async function ChangeCity(e:any){
        e.preventDefault();
        const num=e.target.value;
        await setSelectedCity(cities[num])
        await setMain(cities[num])
    }
    async function calcCheck(e:any){
        e.preventDefault();    
        if (selectedSubject===null || selectedCity==null
            || snowPressure==null || isNaN(snowPressure)
            || windPressure==null || isNaN(windPressure)
            || temperatureWarm==null || isNaN(temperatureWarm)
            || temperatureCold==null || isNaN(temperatureCold)
        )
        {  
            setMainError("Все поля должны быть заполнены")    
        }
        else
        {
            await setLoaded(true);
            await calcStart();
        }  
    }    
    async function calcStart() {
        await CalcService.exportExcelAsync(snowPressure,windPressure,temperatureWarm,temperatureCold,
            async (suc)=>{await setLoaded(false)},
            async (err)=>{ await setLoaded(false)}
        )
    }
    return ( 
        <Authorize>
            <h1 className="title-1" style={{marginBottom:-10}}>Расчет</h1>
            <m.div
                initial={{ opacity: 0, y: 400, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 0.6}}>
                    <table>
                        <tr>
                            <td>Территориальный субъект</td>
                            <td>
                            <select onChange={(e) => ChangeSubject(e)}>
                                            {subjects.map((subjext,index)=>(
                                                <option key={index} value={index}>{subjext.name}</option>
                                            )) }
                                        </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Населенный пункт</td>
                            <td>
                                <select onChange={(e) => {ChangeCity(e)}}>
                                                {cities.map((city,index)=>(
                                                    <option key={index} value={index}>{city.name}</option>
                                                )) }
                                </select>   
                            </td>
                        </tr>
                        <tr>
                            <td>Снеговое давление, Па</td>
                            <td >
                                <input
                                    onChange={e => setSnowPressure(+e.target.value)}
                                    value={snowPressure}
                                    type="text" className="email" />
                            </td>
                        </tr>
                        <tr>
                            <td>Ветровое давление, Па</td>
                            <td>
                                <input
                                    onChange={e => setWindPressure(+e.target.value)}
                                    value={windPressure}
                                    type="text" className="email" />
                            </td>
                        </tr>
                        <tr>
                            <td>Температура теплая</td>
                            <td>
                            <input
                                    onChange={e => setTemperatureWarm(+e.target.value)}
                                    value={temperatureWarm}
                                    type="text" className="email" />
                            </td>
                        </tr>
                        <tr>
                            <td>Температура холодная</td>
                            <td>
                            <input
                                    onChange={e => setTemperatureCold(+e.target.value)}
                                    value={temperatureCold}
                                    type="text" className="email" />
                            </td>
                        </tr>
                    </table>
                    <ul className="content-list-auth">
                    <li className="content-list__item">
                                <div className="field email-field">
                                    <span className="error" style={{justifyContent:"center", marginBottom:5}}>
                                        <i className="bx bx-error-circle error-icon" />
                                        <p className="error-text" style={{ textAlign: "right" }}>{mainError}</p>
                                    </span>
                                </div>
                            </li>
                            
                            <div className="content-list__item" style={{margin:10}}>
                                <p className="btn" style={{marginRight:10}}
                                    onClick={ async (e) => {await calcCheck(e)}}>Скачать отчет</p>
                            </div>                            
                        </ul>
                </m.div>                
        </Authorize> 
    );
}
 
export default Function;