import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  
  private apiUrl = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

  
  login(loginObj: any): Observable<any> {
    const url = `${this.apiUrl}/login`
    return this.http.post<any>(url, loginObj)
  }

  signUp(loginObj: any): Observable<any> {
    const url = `${this.apiUrl}/signup`
    return this.http.post<any>(url, loginObj)
  }
}
