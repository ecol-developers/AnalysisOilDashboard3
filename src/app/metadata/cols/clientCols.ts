import { tableColsStructure } from "./tableColsStructure";

export const ClientCols:tableColsStructure[] = [
    {
        field:"id",
        header:"Id",
        dataType:"numeric"
    },
    {
        field:"name",
        header:"Nazwa klienta",
        dataType:"text"
    },
    {
        field:"Action",
        header:"Akcje",
        dataType:"button",
        function:"selectObj",
        icon:"pi pi-plus-circle",
        description:"Wybierz klienta",
        sortable:false,
        filter:false
    }
]