import { Equipment } from "./equipment";

export interface Node{
    id:number;
    name:string;
    equipments:Equipment[];
}