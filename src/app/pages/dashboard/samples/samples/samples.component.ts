import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements  DoCheck {
  type:string;

  constructor(
    private route:ActivatedRoute) {}

  ngDoCheck(): void {
    this.type=this.route.snapshot.paramMap.get("id");
  }
  }


