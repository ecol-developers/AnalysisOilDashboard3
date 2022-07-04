import { RouteInfo } from './RouteInfo';

export const Menu: RouteInfo[] = [
{
    path: '/dashboard/mainpage',
    type: 'link',
    icontype: 'dashboard',
    key: 'sidebarmenu.mainpage'
}, {
    path: '/dashboard/samples',
    title: 'Lista wszystkich próbek',
    type: 'link',
    icontype: 'storage',
    key: 'sidebarmenu.all_labors'
}, {
    path: '/dashboard/equipments',
    title: 'Próbki wg urządzenia',
    type: 'link',
    icontype: 'storage',
    key: 'sidebarmenu.labors_by_equipment'
}, {
    path: '/dashboard/group',
    title: 'Pogrupowanie',
    type: 'sub',
    icontype: 'apps',
    collapse: 'Pogrupowanie',
    key: 'sidebarmenu.groupped',
    children: [
        {path: 'warning', title: 'Próbki status UWAGA', ab: 'RU', key: 'sidebarmenu.labors_warning_state'},
        {path: 'advice', title: 'Próbki status WSKAZÓWKA', ab: 'RW', key: 'sidebarmenu.labors_hint_state'},
        {path: 'normal', title: 'Próbki status W NORMIE', ab: 'RN', key: 'sidebarmenu.labors_normal_state'},
    ]
}
];

export const AdminMenu: RouteInfo[] = [
            {
                path: '/dashboard/admin',
                title: 'Administracja',
                type: 'sub',
                icontype: 'apps',
                key: 'sidebarmenu.administrators',
                collapse: 'Administracja',
                children: [
                    {path: 'users', title: 'Użytkownicy', ab: 'AU', key: 'sidebarmenu.users'},
                    {path: 'clients', title: 'Klienci', ab: 'AC', key: 'sidebarmenu.clients'},
                    {path: 'logHistories', title: 'Historie logowań', ab: 'AS', key: 'sidebarmenu.login_history'},
                ]
            }
        ];


export const UserMenu: RouteInfo[] = [
    {
        path: '/',
        title: '',
        type: '',
        icontype: '',
        key: ' ',
        collapse: '',
        children: [
            {path: 'user/myProfile', title: 'Mój Profil', ab: 'MP', key: 'sidebarmenu.my_profile'},
            {path: 'user/myLogHistories', title: 'Historia logowania', ab: 'MH', key: 'sidebarmenu.login_history'},
            {path: '/-', title: 'Instrukcja obsługi', ab: 'IO', key: 'sidebarmenu.manual'}
        ]
    }
];
