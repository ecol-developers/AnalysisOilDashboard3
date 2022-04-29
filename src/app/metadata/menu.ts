import { RouteInfo } from "./RouteInfo";

export const MENU:RouteInfo[] = [
{
    path:"/dashboard",
    title: "Strona Głowna",
    type:"link",
    icontype:'dashboard'
},{
    path:"/samples/tree",
    title: "Wg urządzenia",
    type:"link",
    icontype:'storage'
},{
    path:"/samples/all",
    title: "Wszystkie",
    type:"link",
    icontype:'view_headline'
},{
    path:"/",
    title: "Pogrupowanie",
    type:"sub",
    icontype:'apps',
    collapse:"Pogrupowanie",
    children: [
        {path:"/samples", title:"Z nieprzeczytanym raportem", ab:"N"},
        {path:"/samples", title:"Z nieprzeczytanym raportem ze statusem Uwaga", ab:"NU"},
    ]
}
]