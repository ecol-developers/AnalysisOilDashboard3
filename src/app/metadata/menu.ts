import { RouteInfo } from "./RouteInfo";

export const MENU:RouteInfo[] = [
{
    path:"/dashboard",
    title: "Strona Głowna",
    type:"link",
    icontype:'dashboard'
},{
    path:"/samples/tree",
    title: "Urządzenia",
    type:"link",
    icontype:'storage'
},{
    path:"/samples/all",
    title: "Próbki",
    type:"link",
    icontype:'view_headline'
},{
    path:"/",
    title: "Pogrupowanie",
    type:"sub",
    icontype:'apps',
    collapse:"Pogrupowanie",
    children: [
        {path:"/samples", title:"Nieprzeczytane raporty", ab:"NR"},
        {path:"/samples", title:"Raporty ze statusem UWAGA", ab:"RU"},
    ]
},{
    path:"/",
    title: "Administrator",
    type:"sub",
    icontype:'laptop_chromebook',
    collapse:"Administrator",
    children: [
        {path:"/samples", title:"Statystyki", ab:"S"},
        {path:"/samples", title:"Użytkownicy", ab:"U"},
    ]
}
]