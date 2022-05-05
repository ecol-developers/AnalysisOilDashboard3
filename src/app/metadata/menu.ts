import { RouteInfo } from "./RouteInfo";

export const Menu:RouteInfo[] = [
{
    path:"/dashboard/mainpage",
    title: "Strona Głowna",
    type:"link",
    icontype:'dashboard'
},{
    path:"/dashboard/samples",
    title: "Próbki beta",
    type:"link",
    icontype:'storage'
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
},
{
    path:"/",
    title: "Pogrupowanie",
    type:"sub",
    icontype:'apps',
    collapse:"Pogrupowanie",
    children: [
        {path:"/samples", title:"Nieprzeczytane raporty", ab:"NR"},
        {path:"/samples", title:"Raporty ze statusem UWAGA", ab:"RU"},
    ]
}
]

export const AdminMenu:RouteInfo[] = [
            {
                path:"/",
                title: "Administracja",
                type:"sub",
                icontype:'apps',
                collapse:"Administracja",
                children: [
                    {path:"/samples", title:"Użytkownicy", ab:"NR"},
                    {path:"/samples", title:"Statystyki", ab:"RU"},
                ]
            }
        ];


export const UserMenu:RouteInfo[] = [
    {
        path:"",
        title: "",
        type:"",
        icontype:"",
        collapse:"",
        children: [
            {path:"/myProfile", title:"Mój Profil", ab:"MP"},
            {path:"/editProfile", title:"Edycja Profilu", ab:"EP"},
            {path:"/settings", title:"Ustawienia", ab:"U"},
            {path:"", title:"Wyloguj", ab:"W", action:"logout"},
        ]
    }
]