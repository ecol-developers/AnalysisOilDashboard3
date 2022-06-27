import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { transcode } from 'buffer';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements  DoCheck{
  type:string;
  constructor(
    private route:ActivatedRoute,
    private translateService:TranslateService) {}

  ngDoCheck(): void {
    this.type=this.route.snapshot.paramMap.get("id");
  }
  }


