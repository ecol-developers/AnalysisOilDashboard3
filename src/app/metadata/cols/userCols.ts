import { tableColsStructure } from "./tableColsStructure";

export const UserCols:tableColsStructure[] = [
    {
        field:"id",
        header:"Id",
        dataType:"numeric"
    },
    {
        field:"email",
        header:"Email",
        dataType:"text"
    },
    {
        field:"name",
        header:"Imię",
        dataType:"text"
    },
    {
        field:"surname",
        header:"Nazwisko",
        dataType:"text"
    },
    {
        field:"login",
        header:"Nazwa uzytkownika",
        dataType:"text"
    },
    {
        field:"clientSymbol",
        header:"Symbol klienta",
        dataType:"text"
    },
    {
        field:"clientName",
        header:"Nazwa klienta",
        dataType:"text"
    },
    {
        field:"lastLoginDate",
        header:"Data ost. logowania",
        dataType:"date"
    },
    {
        field:"Action",
        header:"Akcje",
        dataType:"button",
        function:"addClient",
        icon:"pi pi-plus-circle",
        description:"Przypisz klienta",
        sortable:false,
        filter:false
    }
]