import axios from "axios";
import { IHttpResponse } from "./model/HttpResponse";
import { SignInRequest } from "../services/auth/model/SignInRequest";
import useAuth from "../components/context/useAuth";

export const BASE_URL='http://localhost:5000/'
export const BASE_HEADERS = {
  'Host':'*',
  'Access-Control-Allow-Origin': '*',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const $client = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {...BASE_HEADERS}
});

export let controller = new AbortController();

$client.interceptors.request.use(
    (config)=>{
        config.headers.Authorization=`Bearer ${localStorage.getItem("token")}`       
        let controller_new = new AbortController(); 
        controller=controller_new
        config.signal=controller_new.signal;
        return config
    }
);

$client.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
     const originalRequest = {...error.config};
      if (
        error.response.status ===401 && 
        error.config && localStorage.getItem("token")!=null
      ) {
        let {logout}=useAuth()
        try {
          const credentials={} as SignInRequest;
          credentials.login="";credentials.password="";
          await $client.post<IHttpResponse<string>>("api/v1/auth/signin",credentials)
                        .then(async (suc)=>{
                                  if (suc.data.data!=null)
                                      localStorage.setItem("token", suc.data.data);
                                  return await $client.request(originalRequest);
                              })
                        .catch(async()=>logout());
        } catch (error) { logout()}
      }
      return Promise.reject(error);
    }
  )

  export default $client;