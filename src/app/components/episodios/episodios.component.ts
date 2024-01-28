import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Episodio } from 'src/app/core/interfaces/episodio';
import { EpisodiosService } from 'src/app/core/services/episodios.service';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css']
})
export class EpisodiosComponent implements OnInit {
  numPage: number
  totalPages: number
  totalResults: number
  episodios: Episodio[]

  constructor(private episodioSvc: EpisodiosService, private dialog: MatDialog) { 
    this.numPage = 1
    this.totalPages = 1
    this.totalResults = 0
    this.episodios = []
  }

  ngOnInit() {
    this.getEpisodiosByPage(this.numPage)
  }

  nextPage() {
    this.numPage += 1
    this.getEpisodiosByPage(this.numPage)
  }

  lastPage() {
    this.getEpisodiosByPage(this.totalPages)
  }

  reset() {
    this.getEpisodiosByPage(1)
  }

  getEpisodiosByPage(page: number) {
    this.episodioSvc.getEpisodiosByPage(this.numPage).subscribe({
      next: (res) => {
        this.totalPages = res.info.pages
        this.totalResults = res.info.count
        this.episodios = res.results
        console.log(this.episodios)
      },
      error: (_err) => {
        console.log('fallo!')
        //logica de falla
      }
    })
  }

}
