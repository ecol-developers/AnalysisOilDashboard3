import { Component,OnInit } from '@angular/core';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { TreeNode} from 'primeng/api';
import { Sample } from 'src/app/models/sample';
import { SamplesService } from 'src/app/services/samples.service';
import { SampleDetail } from 'src/app/models/sampleDetail';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SampleAttachment } from 'src/app/models/sampleAttachment';


@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css'],
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
export class EquipmentsComponent implements OnInit  {
  
  tree:TreeNode[];
  samples:Sample[];
  details:SampleDetail[];
  selectedEquipment:TreeNode;
  treeLoading:boolean;
  tableLoading:boolean;

  constructor(
    private service:EquipmentsService,
    private sampleService:SamplesService
  ) { }


  ngOnInit(): void {
   this.getEquipmentTree();
  }

  getEquipmentTree(){
    this.treeLoading = true;
    this.service.GetEquipmentTree().subscribe({
      next:(res:TreeNode<any>[])=>{
        this.tree = res;
      },
      complete:()=>{
        this.treeLoading= false;
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

  selectEquipment(event){
      console.log("wybrano urz: ",event.node.key,";");
      let eqId = event.node.key;
      if(eqId>0){
        this.getSampleByEquipmentId(eqId);
      }
      
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
