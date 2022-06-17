import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-histories',
  templateUrl: './log-histories.component.html',
  styleUrls: ['./log-histories.component.css']
})
export class LogHistoriesComponent implements OnInit {
  title:string = "Historia logowań";
  constructor() { }

  ngOnInit(): void {
  }

}
