import { Equipment } from "./equipment";
import { Node } from "./node";

export interface EquipmentTree{
    clientId:number;
    clientName:string;
    equipments?:Equipment[];
    // nodes?:Node[];
}