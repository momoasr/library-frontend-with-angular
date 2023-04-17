import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of, tap } from 'rxjs';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  @Output() loginSuccess = new EventEmitter<boolean>();
  
  constructor(
    private fb: FormBuilder,
    private service: LibraryService,
    private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  close() {
    this.modal.close();
  }

  login() {
    const loginObj = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    }
    this.service.login(loginObj)
      .pipe(
        tap((token) => {
          this.errorMessage = '';
          const res = this.parseJwt(token.token);
          localStorage.setItem("token", JSON.stringify(res));
          this.loginSuccess.emit(true);
          this.close();
        }),
        catchError((err) => {
          console.log(err);
          this.errorMessage = err.error;
          return of(err);
        })
      )
      .subscribe();
  }

  parseJwt(token: any): any {
    try {
      const res = JSON.parse(window.atob(token.split('.')[1]));
      const exp = Date.now() > res.exp * 1000;
      return {
        userData: res,
        isValidToken: !exp,
        token
      }
    } catch (e) {
      return null;
    }
  }
}
