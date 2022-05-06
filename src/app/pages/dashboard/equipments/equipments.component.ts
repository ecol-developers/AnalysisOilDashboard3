import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentTree } from 'src/app/models/equipmentTree';
import { EquipmentsService } from 'src/app/services/equipments.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit, OnChanges, AfterViewInit  {
  public tree:Observable<EquipmentTree>;

  constructor(
    private service:EquipmentsService
  ) { }

  ngAfterViewInit(): void {
    console.log("afterViewInit");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges:"+changes);
  }

  ngOnInit(): void {

    this.service.refreshTreeEquipment().subscribe({
      next:(res:EquipmentTree)=>{
         console.log('next '+res);
      },
      complete:()=> console.log("complete")
    });
  }

}
