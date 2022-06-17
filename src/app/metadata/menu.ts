import { RouteInfo } from "./RouteInfo";

export const Menu:RouteInfo[] = [
{
    path:"/dashboard/mainpage",
    title: "Strona Głowna",
    type:"link",
    icontype:'dashboard'
},{
    path:"/dashboard/samples",
    title: "Lista wszystkich próbek",
    type:"link",
    icontype:'storage'
},{
    path:"/dashboard/equipments",
    title: "Próbki wg urządzenia",
    type:"link",
    icontype:'storage'
},{
    path:"/dashboard/group",
    title: "Pogrupowanie",
    type:"sub",
    icontype:'apps',
    collapse:"Pogrupowanie",
    children: [
        {path:"warning", title:"Próbki status UWAGA", ab:"RU"},
        {path:"advice", title:"Próbki status WSKAZÓWKA", ab:"RW"},
        {path:"normal", title:"Próbki status W NORMIE", ab:"RN"},
    ]
}]

export const AdminMenu:RouteInfo[] = [
            {
                path:"/dashboard/admin",
                title: "Administracja",
                type:"sub",
                icontype:'apps',
                collapse:"Administracja",
                children: [
                    {path:"users", title:"Użytkownicy", ab:"AU"},
                    {path:"clients", title:"Klienci", ab:"AC"},
                    {path:"logHistories", title:"Historie logowań", ab:"AS"},
                ]
            }
        ];


export const UserMenu:RouteInfo[] = [
    {
        path:"/",
        title: "",
        type:"",
        icontype:"",
        collapse:"",
        children: [
            {path:"user/myProfile", title:"Mój Profil", ab:"MP"},
            {path:"user/myLogHistories", title:"Historia logowania", ab:"MH"},
        ]
    }
]