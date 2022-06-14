import { AuthorizationTokenMd } from "./authorizationTokenMD";

export interface LoginResultMd{
    userId:number;
    userLogin:string;
    accessToken: AuthorizationTokenMd;
    refreshToken: AuthorizationTokenMd;
    
}