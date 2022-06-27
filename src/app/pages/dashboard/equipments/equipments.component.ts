import { Component,OnInit } from '@angular/core';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { TreeNode} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit  {
  
  tree:TreeNode[];
  selectedEquipment:TreeNode;
  treeLoading:boolean;
  equipmentId:number;

  constructor(
    private service:EquipmentsService,
    private translateService:TranslateService
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

  selectEquipment(event){
      if(event.node.data === "Equipment"){
        let eqId = event.node.key;
        if(eqId>0){
          this.equipmentId = eqId;
        }
      }
  }
}
