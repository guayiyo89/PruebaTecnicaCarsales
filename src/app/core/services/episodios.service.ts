import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEpisodio, Episodio } from '../interfaces/episodio';
import { URLS } from '../constants/url.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodiosService {

constructor(private http: HttpClient) { }
  getEpisodiosByPage(page: number): Observable<BaseEpisodio> {
    let url = `${URLS.episode}/?page=${page}`
    return this.http.get<BaseEpisodio>(url)
  }

  getEpisodiosByLink(link: string): Observable<BaseEpisodio> {
    return this.http.get<BaseEpisodio>(link)
  }

  getEpisodio(id:number): Observable<Episodio> {
    let url = `${URLS.episode}/${id}`
    return this.http.get<Episodio>(url)
  }

  getEpisodeByName(name: string, page: number): Observable<BaseEpisodio> {
    let url = `${URLS.episode}/?name=${name}&page=${page}`
    return this.http.get<BaseEpisodio>(url)
  }
}
