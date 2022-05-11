import { Component,OnInit } from '@angular/core';
import { EquipmentTree } from 'src/app/models/equipmentTree';
import { EquipmentsService } from 'src/app/services/equipments.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }


@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit  {
  
  public tree:EquipmentTree;

  // private _transformer = (node: EquipmentTree, level: number) => {
  //   return {
  //     expandable: !!node.equipments && node.equipments.length > 0,
  //     name: node.clientName,
  //     level: level,
  //   };
  // };


  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //   node => node.level,
  //   node => node.expandable
  // );

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   node => node.level,
  //   node => node.expandable,
  //   node => node.equipments
  // );

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(
    private service:EquipmentsService
  ) { }


  ngOnInit(): void {

    // this.dataSource.data = this.service.refreshTreeEquipment();

    this.service.refreshTreeEquipment().subscribe({
      next:(res:EquipmentTree)=>{
        this.tree = res;
      }
    });
  }

}
