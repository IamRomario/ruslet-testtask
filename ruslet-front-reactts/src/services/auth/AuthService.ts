import axios  from "axios";
import $client, { BASE_HEADERS,BASE_URL } from "../../http/client"
import {IHttpResponse,IEmptyHttpResponse} from "../../http/model/HttpResponse"
import { SignInRequest } from "./model/SignInRequest";
import { log } from "console";


export default class AuthService {
    
    static authPath="api/v1/auth";

    static async  signin (login:string,password:string,
                        success?:(args:IHttpResponse<string>)=>Promise<void>,
                        error?:(args:any)=>Promise<void>)
    {
        const credentials={} as SignInRequest
        credentials.login=login;
        credentials.password=password;
        await $client.post<IHttpResponse<string>>("api/v1/auth/signin",credentials)
                .then(async (suc)=>{if (success!=null && suc!=null) await success(suc.data)})
                .catch(async (err)=>{if (error!=null) await error(err)});
    } 
}