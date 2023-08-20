import { Component, OnInit } from '@angular/core';
// import { AuthNewService } from './auth/authNew.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.authService.autoLogin();
  }
}

