import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // baseUrl: string = 'http://localhost:8080' || window.location.origin;

  baseUrl: string = window.location.origin;


  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
   return this.http.get(`${this.baseUrl}/${url}`).pipe(
      catchError(this.handleError)
    )
  }

  post(url: string, reqBody: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, reqBody).pipe(
      catchError(this.handleError)
    )
  }

  put(url: string, reqBody: object): Observable<any> {
    return this.http.put(`${this.baseUrl}/${url}`, reqBody).pipe(
      catchError(this.handleError)
    )
  }

  download(url: string, headers: object): Observable<any> {
   return this.http.get(`${this.baseUrl}/${url}`, headers)
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return 'An error occurred:' + error.error.message;
    }
    switch (error.status) {
      case 500:
        return  throwError('Internal server error, Please check after some time');
      case 404:
        return throwError('URL not found, Please check the URL and try again');
      case 503:
        return throwError('Service Unavailable, Please check after some time');
      case 504:
        return throwError('Gateway timeout error, Please check after some time');
      default:
        return throwError('Something bad happened, Please check after some time');
    }
  }

}
