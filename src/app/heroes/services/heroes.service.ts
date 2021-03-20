import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private endPoint: string = environment.endPoint;
  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.endPoint}/heroes`);
  }

  getHeroeById( id: string ): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.endPoint}/heroes/${id}`);
  }

  getSugerencias( term: string ): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.endPoint}/heroes?q=${ term }&_limit=6`);
  }

  addHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.endPoint}/heroes`, heroe);
  }

  updateHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.endPoint}/heroes/${heroe.id}`, heroe);
  }

  deleteHeroe( id: string ): Observable<any> {
    return this.http.delete<any>(`${this.endPoint}/heroes/${id}`);
  }



}
