import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { Sample } from 'src/app/models/sample';
import { SampleAttachment } from 'src/app/models/sampleAttachment';
import { SampleDetail } from 'src/app/models/sampleDetail';
import { SamplesService } from 'src/app/services/samples.service';
import { SampleDetailService } from 'src/app/services/sample-detail.service';
import { MessageService } from 'primeng/api';

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
  ],
  providers:[MessageService]

})
export class SampleTableComponent implements OnChanges {
  samples:Sample[];
  tableLoading:boolean;

  @Input() equipmentId?:number;
  @Input() showAll?:boolean;
  @Input() type?:string;


  constructor(  
    private sampleService:SamplesService,
    private sampleDetailService:SampleDetailService,
    private messageService:MessageService
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
     if(!this.showAll && this.equipmentId>0 )
       this.getSampleByEquipmentId(this.equipmentId);

     if(this.showAll)
      this.getListByClientId(this.type);
        
  }

  getListByClientId(type?:string){
    this.tableLoading = true;
    this.sampleService.GetListByClientId().subscribe({
      next:(res:Sample[])=>{
        this.samples = res;
        switch (type) {
          case "warning":
              this.samples = res.filter((obj)=>obj.noteName === 'UWAGA');
          break;
          case "advice":
                this.samples = res.filter((obj)=>obj.noteName === 'WSKAZÓWKA');
          break;
          case "normal":
            this.samples = res.filter((obj)=>obj.noteName === 'W NORMIE');
          break;
          default:
            this.samples = res;
          break;
        }
      },
      complete:()=>{
        this.tableLoading= false;
      },
      error:()=>{
        this.samples=[];
        this.messageService.add({
          severity:"warn",
          summary:"Brak próbek laboratoryjnych"
        });
        this.tableLoading = false;
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
      },
      error:()=>{
        this.samples = [];
        this.messageService.add({
          severity:"warn",
          summary:"Brak próbek dla wybranego urządzenia!"
        });
        this.tableLoading = false;
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
      },
      error:()=>{
        this.messageService.add({
          severity:"error",
          summary:"Brak raportu dla wybranej próbki"
        })
      }
    })
  }

  clear(table: Table) {
    table.clear();
}

expendSampleDetail(row:Sample){
  this.sampleDetailService.getBySampleId(row.id).subscribe({
    next:(res:SampleDetail[])=> {
      row.details = res;
    }
  });


}

}
