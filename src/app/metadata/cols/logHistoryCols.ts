import { tableColsStructure } from "./tableColsStructure";

export const LogHistoryCols:tableColsStructure[] = [
    {
        field:"id",
        header:"Id",
        dataType:"numeric"
    },
    {
        field:"userLogin",
        header:"Login",
        dataType:"text"
    },
    {
        field:"userName",
        header:"Imię",
        dataType:"text"
    },
    {
        field:"userSurname",
        header:"Nazwisko",
        dataType:"text"
    },
    {
        field:"clientName",
        header:"Nazwa klienta",
        dataType:"text"
    },
    {
        field:"date",
        header:"Data logowania",
        dataType:"date"
    }
]