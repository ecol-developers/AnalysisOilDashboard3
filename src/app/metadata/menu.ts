import { RouteInfo } from "./RouteInfo";

export const MENU:RouteInfo[] = [{
    path:"/samples",
    title: "Wg urządzenia",
    type:"link",
    icontype:'dashboard'
},{
    path:"/samples",
    title: "Wszystkie",
    type:"link",
    icontype:'dashboard'
},{
    path:"/samples",
    title: "Pogrupowanie",
    type:"sub",
    icontype:'apps',
    collapse:"Pogrupowanie",
    children: [
        {path:"/samples", title:"Z nieprzeczytanym raportem", ab:"N"},
        {path:"/samples", title:"Z nieprzeczytanym raportem ze statusem Uwaga", ab:"NU"},
    ]
}]