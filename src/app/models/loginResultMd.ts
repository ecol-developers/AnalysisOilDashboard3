import { AuthorizationTokenMd } from "./authorizationTokenMd";

export interface LoginResultMd{
    userId:number;
    userLogin:string;
    accessToken: AuthorizationTokenMd;
    refreshToken: AuthorizationTokenMd;
    
}