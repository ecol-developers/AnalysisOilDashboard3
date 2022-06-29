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

    // const refresh = localStorage.getItem('refreshToken');

    // this.authService.refreshToken(refresh).subscribe({
    //   next: (res: LoginResultMd) => {
    //     this.authService.SaveJwtToken(res);
    //   },
    //   error: (err) => {
    //     console.log('Błąd odswiezania tokenu: ', err);
    //     this.authService.Logout();
    //   }
    // });
  }

  ngDoCheck(): void {
    this.type = this.route.snapshot.paramMap.get('id');
  }
  }


