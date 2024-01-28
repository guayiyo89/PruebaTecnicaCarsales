import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseEpisodio, Episodio } from 'src/app/core/interfaces/episodio';
import { EpisodiosService } from 'src/app/core/services/episodios.service';
import { ModalEpisodioComponent } from './modal-episodio/modal-episodio.component';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css'],
})
export class EpisodiosComponent implements OnInit {
  numPage: number;
  totalPages: number;
  totalResults: number;
  episodios: Episodio[];
  linkNextPage: string;
  linkPrevPage: string;
  disablePrev = true;
  disableNext = false;
  filterText = new FormControl('');
  selectPage = new FormControl('');

  constructor(
    private episodioSvc: EpisodiosService,
    public dialog: MatDialog
  ) {
    this.numPage = 1;
    this.totalPages = 1;
    this.totalResults = 0;
    this.episodios = [];
    this.linkNextPage = '';
    this.linkPrevPage = '';
  }

  ngOnInit() {
    this.getEpisodiosByPage(this.numPage);
  }

  nextPage() {
    this.numPage += 1;
    this.evalNext();
    this.evalPrev();
    this.getEpisodioByLink(this.linkNextPage);
  }

  prevPage() {
    this.numPage -= 1;
    this.evalNext();
    this.evalPrev();
    this.getEpisodioByLink(this.linkPrevPage);
  }

  lastPage() {
    this.getEpisodiosByPage(this.totalPages);
  }

  reset() {
    this.numPage = 1
    this.getEpisodiosByPage(1);
  }

  getEpisodiosByPage(page: number) {
    this.episodioSvc.getEpisodiosByPage(this.numPage).subscribe({
      next: (res) => {
        this.establecerData(res)
        this.episodios = res.results;
      },
      error: (_err) => {
        console.log('fallo!');
        //logica de falla
      },
    });
  }

  getEpisodioByLink(url: string) {
    this.episodioSvc.getEpisodiosByLink(url).subscribe({
      next: (res) => {
        this.establecerData(res)
        this.episodios = res.results;
      },
      error: (_err) => {
        console.log('fallo!');
        //logica de falla
      },
    });
  }

  filterEpisodes() {
    let texto = this.filterText.value!;
    this.numPage = 1
    this.episodioSvc.getEpisodeByName(texto, 1).subscribe({
      next: (res) => {
        this.establecerData(res)
        this.episodios = res.results;
      },
      error: (_err) => {
        console.log('no hay resultados');
        this.reset()
        this.evalNext()
        this.evalPrev()
      },
    });;
  }

  goToPage() {
      if(parseInt(this.selectPage.value!) >=1 && parseInt(this.selectPage.value!) <= this.totalPages ) {
        let page = this.numPage + 1
        let newPageLink = this.linkNextPage.replace(`page=${page}`, `page=${this.selectPage.value!}`)
        if(!this.linkNextPage){
          let page = this.numPage -1
          newPageLink = this.linkPrevPage.replace(`page=${page}`, `page=${this.selectPage.value!}`)
        } 
        this.getEpisodioByLink(newPageLink)
        this.numPage = parseInt(this.selectPage.value!)

      } else {
        console.log('inserte un numero de pafgina valido')
      }

  }

  establecerData(result: BaseEpisodio) {
    this.totalPages = result.info.pages;
    this.totalResults = result.info.count;
    this.linkNextPage = result.info.next;
    this.linkPrevPage = result.info.prev;

    this.evalNext()
    this.evalPrev()
  }

  evalNext() {
    if (this.numPage >= this.totalPages) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }

  evalPrev() {
    if (this.numPage <= 1) {
      this.disablePrev = true;
    } else {
      this.disablePrev = false;
    }
  }

  showEpisode(item: Episodio) {
    const dialogRef = this.dialog.open(ModalEpisodioComponent, {
      data: item,
      width: '620px'
    })
  }


}
