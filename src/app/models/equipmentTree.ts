export interface EquipmentTree{
    lebel?:string;
    data?:string;
    children:EquipmentTree[];
    expandedIcon?:string;
    collapsedIcon?:string;
    key?:string;
}