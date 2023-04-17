import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of, tap } from 'rxjs';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  get enableSignUpButton(): boolean {
    if(this.signUpForm.valid){
      return this.signUpForm.get('password')?.value
        == this.signUpForm.get('confirmPassword')?.value;
    }
    return false;
  }
  
  constructor(
    private fb: FormBuilder,
    private service: LibraryService,
    private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  close() {
    this.modal.close();
  }

  signUp(){
    const signUpObj = {
      userName: this.signUpForm.value.userName,
      password: this.signUpForm.value.password
    }
    this.service.signUp(signUpObj)
      .pipe(
        tap((msg) => {
          this.errorMessage = '';
          this.successMessage = msg.message;
          // this.close();
        }),
        catchError((err) => {
          console.log(err);
          this.errorMessage = err.error;
          return of(err);
        })
      )
      .subscribe();
  }
}
