import { config } from "process";
import $client from "../../http/client"
import { IHttpResponse } from "../../http/model/HttpResponse";
import { City } from "../calculate/model/City";
import { Subject } from "../calculate/model/Subject";
import { CalcRequest } from "./model/CalcRequest";

export default class CalcService {
    static calcPath="api/v1/subjects";

    static async getSubjectsAsync (success?:(args:IHttpResponse<Subject[]>)=>Promise<void>,
                            error?:(args:any)=>Promise<void>)
    {
        $client.get<IHttpResponse<Subject[]>>(this.calcPath+"/allsubjects")
                .then(async (suc)=>{if (success!=null && suc!=null) await success(suc.data)})
                .catch(async (err)=>{if (error!=null) await error(err)})
    }

    static async  getCitiesAsync (subjectId:number,
                        success?:(args:IHttpResponse<City[]>)=>Promise<void>,
                        error?:(args:any)=>Promise<void>)
    {
        await $client.post<IHttpResponse<City[]>>(this.calcPath+"/allcities",subjectId)
                .then(async (suc)=>{if (success!=null && suc!=null) await success(suc.data)})
                .catch(async (err)=>{if (error!=null) await error(err)});
    } 
    static async  exportExcelAsync (snowPressure:number,
                    windPressure:number,
                    temperatureWarm:number,
                    temperatureCold:number,
                    success?:(args:any)=>Promise<void>,
                    error?:(args:any)=>Promise<void>)
    {
        const requestdata={} as CalcRequest   
        requestdata.snowPressure=snowPressure;  
        requestdata.windPressure=windPressure; 
        requestdata.temperatureWarm=temperatureWarm; 
        requestdata.temperatureCold=temperatureCold; 
        await $client.post("api/v1/calc/exportexcell",requestdata,{responseType: 'blob'})
        .then(async (suc)=>{
            const href = URL.createObjectURL(suc.data);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'example.xlsx');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
            
            if (success!=null) await success(suc)
        })
        .catch(async (err)=>{if (error!=null) await error(err)});
    } 
    

}