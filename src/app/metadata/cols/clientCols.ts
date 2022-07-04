import { tableColsStructure } from './tableColsStructure';

export const ClientCols: tableColsStructure[] = [
    {
        field: 'id',
        header: 'Id',
        dataType: 'numeric',
        key: 'client_table.id'
    },
    {
        field: 'name',
        header: 'Nazwa klienta',
        dataType: 'text',
        key: 'client_table.name'
    },
    {
        field: 'Action',
        header: 'Akcje',
        dataType: 'button',
        function: 'selectObj',
        icon: 'pi pi-plus-circle',
        description: 'Wybierz klienta',
        sortable: false,
        filter: false,
        key: 'client_table.action'
    }
];
