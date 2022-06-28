import { SampleDetail } from "./sampleDetail"

export interface Sample{
    id: number,
    sampleNumber?: string,
    sampleDate?: string,
    sampleState?: string,
    reason?: string,
    lubricantName?: string,
    noteName?: string,
    noteNameEn?:string
    equipmentName?:string,
    nodeName?:string,
    details?:SampleDetail[]
    
}