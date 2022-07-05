import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { transcode } from 'buffer';
import { LoginResultMd } from 'src/app/models/loginResultMd';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements  DoCheck, OnInit {
  type: string;
  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private authService: AuthService) {}
  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.type = this.route.snapshot.paramMap.get('id');
  }
  }


