import { Component, OnInit } from '@angular/core';
import { versionApp } from 'src/app/shared/globals';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  date:Date = new Date();
  public version = versionApp;
  clientId:string;

  constructor() { }

  ngOnInit(): void {
    this.clientId = localStorage.getItem("clientId");
  }

}
