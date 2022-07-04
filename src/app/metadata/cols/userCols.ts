import { tableColsStructure } from './tableColsStructure';

export const UserCols: tableColsStructure[] = [
    {
        field: 'id',
        header: 'Id',
        dataType: 'numeric',
        key: 'user_table.id'
    },
    {
        field: 'email',
        header: 'Email',
        dataType: 'text',
        key: 'user_table.email'
    },
    {
        field: 'name',
        header: 'Imię',
        dataType: 'text',
        key: 'user_table.name'
    },
    {
        field: 'surname',
        header: 'Nazwisko',
        dataType: 'text',
        key: 'user_table.surname'
    },
    {
        field: 'login',
        header: 'Nazwa uzytkownika',
        dataType: 'text',
        key: 'user_table.login'
    },
    {
        field: 'clientSymbol',
        header: 'Symbol klienta',
        dataType: 'text',
        key: 'user_table.client_symbol'
    },
    {
        field: 'clientName',
        header: 'Nazwa klienta',
        dataType: 'text',
        key: 'user_table.client_name'
    },
    {
        field: 'lastLoginDate',
        header: 'Data ost. logowania',
        dataType: 'date',
        key: 'user_table.last_log_date'
    },
    {
        field: 'Action',
        header: 'Akcje',
        dataType: 'button',
        function: 'addClient',
        icon: 'pi pi-plus-circle',
        description: 'Przypisz klienta',
        sortable: false,
        filter: false,
        key: 'user_table.action'
    }
]