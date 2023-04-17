import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { tap } from 'rxjs';
import { TokenData } from './models/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tokenData: TokenData | undefined = undefined;

  constructor(private _modalService: NgbModal) { }
  ngOnInit(): void {
    this.displayLoggedInUserInfo();
  }

  login() {
    const modalRef = this._modalService.open(LoginComponent);
    modalRef.componentInstance.loginSuccess
      .pipe(
        tap(() => this.displayLoggedInUserInfo())
      )
      .subscribe();
  }

  logout(){
    localStorage.removeItem('token');
    this.tokenData = undefined;
  }

  signup() {
    this._modalService.open(SignupComponent)
  }

  displayLoggedInUserInfo() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr) {
      this.tokenData = JSON.parse(tokenStr) as TokenData;
    }
  }
}
