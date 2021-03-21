import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private endPoint: string = environment.endPoint;
  private _auth: Auth | undefined;

  get auth(): Auth{
    // tslint:disable-next-line: no-non-null-assertion
    return {...this._auth!};
  }
  constructor( private http: HttpClient ) { }

  verifyAuth(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.endPoint}/usuarios/1`)
            .pipe(
              map(auth => {
                this._auth = auth;
                return true;
              })
            );
  }


  login(): Observable<Auth>{
    return this.http.get<Auth>(`${this.endPoint}/usuarios/1`)
    .pipe(
      tap( auth => this._auth = auth),
      tap( auth => localStorage.setItem('token', auth.id))
    );
  }

  // tslint:disable-next-line: typedef
  logout() {
    this._auth = undefined;
  }
}
