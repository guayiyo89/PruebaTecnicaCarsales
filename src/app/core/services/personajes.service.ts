import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasePersonaje, Personaje } from '../interfaces/personaje';
import { Observable } from 'rxjs';
import { URLS } from '../constants/url.constant';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  constructor(private http: HttpClient) {}

  getPersonajesByPage(page: number): Observable<BasePersonaje> {
    let url = `${URLS.characters}/?page=${page}`
    return this.http.get<BasePersonaje>(url)
  }

  getPersonajesByLink(link: string): Observable<BasePersonaje> {
    return this.http.get<BasePersonaje>(link)
  }

  getPersonaje(id:number): Observable<Personaje> {
    let url = `${URLS.characters}/${id}`
    return this.http.get<Personaje>(url)
  }

  getPersonajeByName(name: string, page: number, status?: string): Observable<BasePersonaje> {
    let url = `${URLS.characters}/?name=${name}&page=${page}`
    if(status && status.length > 0) {
      url = `${URLS.characters}/?name=${name}&page=${page}&status=${status}`
    }
    return this.http.get<BasePersonaje>(url)
  }
}
