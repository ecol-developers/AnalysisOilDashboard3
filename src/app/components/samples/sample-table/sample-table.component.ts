import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Sample } from 'src/app/models/sample';
import { SampleAttachment } from 'src/app/models/sampleAttachment';
import { SampleDetail } from 'src/app/models/sampleDetail';
import { SamplesService } from 'src/app/services/samples.service';

@Component({
  selector: 'app-sample-table',
  templateUrl: './sample-table.component.html',
  styleUrls: ['./sample-table.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class SampleTableComponent implements OnChanges {
  samples:Sample[];
  details:SampleDetail[];
  tableLoading:boolean;

  @Input() equipmentId?:number;
  @Input() showAll?:boolean;


  constructor(  
    private sampleService:SamplesService
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
     if(!this.showAll && this.equipmentId>0 )
       this.getSampleByEquipmentId(this.equipmentId);

     if(this.showAll)
        this.getListByClientId();
  }

  getListByClientId(){
    this.tableLoading = true;
    this.sampleService.GetListByClientId().subscribe({
      next:(res:Sample[])=>{
        this.samples = res;
      },
      complete:()=>{
        this.tableLoading= false;
      }
    });
  }

  getSampleByEquipmentId(id:number){
    this.tableLoading = true;
    this.sampleService.GetListByEquipmentId(id).subscribe({
      next:(res:Sample[])=>{
        this.samples = res;
      },
      complete:()=>{
        this.tableLoading= false;
      }
    });
  }

  downloadReport(sampleId:number){
    this.sampleService.DownloadReport(sampleId).subscribe({
      next:(res:SampleAttachment)=>{
        const source = `data:application/pdf;base64,${res.file}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${res.name}.pdf`
        link.click();
      }
    })
  }

}
