import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataTable } from 'src/app/metadata/dataTable';
import { Sample } from 'src/app/models/sample';
import { SamplesService } from 'src/app/services/samples.service';

declare const $: any;

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit, AfterViewInit {
  public dataTable:DataTable;
  loading:boolean;

  constructor(private service:SamplesService) { }

  ngOnInit(): void {
    this.getData();
  }


  ngAfterViewInit(): void {

    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Wyszukaj...",
      }

    });
}


    getData() {
      this.loading = true;
      this.service.getDataByClientId().subscribe({
        next:(res:Sample[])=>{
          this.dataTable = {
            headerRow: ["Numer", "Data", "Status", "Powód wykonania", "Nazwa oleju","Uwagi","Urządzenie", "Oddział", "Akcje"],
            dataRows: res,
            footerRow: ["Numer", "Data", "Status", "Powód wykonania", "Nazwa oleju","Uwagi","Urządzenie", "Oddział",""]
          }
        },
        complete:()=>{
          this.loading = false;
        }
      })
    }

    downloadPdf(sampleId:number){
      console.log("sciaganie pdf dla sampleid: "+sampleId);
    }

    showSampleDetail(sampleId:number){
      console.log("sampleDetail : "+sampleId);
    }

    showSampleDetailChart(sampleId:number){
      console.log("sampleDetailChart: "+sampleId);
    }

   
  }


