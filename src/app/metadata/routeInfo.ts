import { ChildrenItems } from "./ChildrenItems";

export interface RouteInfo {
    path: string;
    key:string;
    title?: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}