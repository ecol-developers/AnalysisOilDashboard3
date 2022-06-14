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
        {path:"warning", title:"Raporty ze statusem UWAGA", ab:"RU"},
        {path:"advice", title:"Raporty ze statusem WSKAZÓWKA", ab:"RW"},
        {path:"normal", title:"Raporty ze statusem W NORMIE", ab:"RN"},
    ]
}]

export const AdminMenu:RouteInfo[] = [
            {
                path:"/",
                title: "Administracja",
                type:"sub",
                icontype:'apps',
                collapse:"Administracja",
                children: [
                    {path:"/users", title:"Użytkownicy", ab:"AU"},
                    {path:"/statistics", title:"Statystyki", ab:"AS"},
                ]
            }
        ];


export const UserMenu:RouteInfo[] = [
    {
        path:"/dashboard/user",
        title: "",
        type:"",
        icontype:"",
        collapse:"",
        children: [
            {path:"myProfile", title:"Mój Profil", ab:"MP"},
            {path:"settings", title:"Ustawienia", ab:"U"}
        ]
    }
]