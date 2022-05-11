import { authorizationTokenMd } from "./authorizationTokenMD";

export interface loginResultMd{
    userId:number;
    userLogin:string;
    accessToken: authorizationTokenMd;
    refreshToken: authorizationTokenMd;
}