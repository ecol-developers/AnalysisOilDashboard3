import { tableColsStructure } from "./tableColsStructure";

export const LogHistoryCols:tableColsStructure[] = [
    {
        field:"id",
        header:"Id",
        dataType:"numeric",
        key:"log_history_table.id"
    },
    {
        field:"userLogin",
        header:"Login",
        dataType:"text",
        key:"log_history_table.login"
    },
    {
        field:"userName",
        header:"Imię",
        dataType:"text",
        key:"log_history_table.name"
    },
    {
        field:"userSurname",
        header:"Nazwisko",
        dataType:"text",
        key:"log_history_table.surname"
    },
    {
        field:"clientName",
        header:"Nazwa klienta",
        dataType:"text",
        key:"log_history_table.client"
    },
    {
        field:"date",
        header:"Data logowania",
        dataType:"date",
        key:"log_history_table.date"
    }
]