import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseEpisodio, Episodio } from 'src/app/core/interfaces/episodio';
import { EpisodiosService } from 'src/app/core/services/episodios.service';
import { ModalEpisodioComponent } from './modal-episodio/modal-episodio.component';
import { ModalErrorComponent } from 'src/app/shared/modal-error/modal-error.component';

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

  constructor(private episodioSvc: EpisodiosService, public dialog: MatDialog) {
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

  getEpisodiosByPage(page: number) {
    this.episodioSvc.getEpisodiosByPage(this.numPage).subscribe({
      next: (res) => {
        this.establecerData(res);
        this.episodios = res.results;
      },
      error: (_err) => {
        this.showError('Fallo de servicio.');
      },
    });
  }

  getEpisodioByLink(url: string) {
    this.episodioSvc.getEpisodiosByLink(url).subscribe({
      next: (res) => {
        this.establecerData(res);
        this.episodios = res.results;
      },
      error: (_err) => {
        this.showError('Fallo de servicio.');
      },
    });
  }

  filterEpisodes() {
    let texto = this.filterText.value!;
    this.numPage = 1;
    this.episodioSvc.getEpisodeByName(texto, 1).subscribe({
      next: (res) => {
        this.establecerData(res);
        this.episodios = res.results;
      },
      error: (_err) => {
        this.showError('No hay resultados asociados.');
        this.reset();
        this.evalNext();
        this.evalPrev();
      },
    });
  }

  //=====================PAGINACION===============================

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
    console.log(this.linkNextPage, this.linkPrevPage);
    this.checkForLink(this.totalPages)
    this.numPage = this.totalPages
  }

  firstPage() {
    console.log(this.linkNextPage, this.linkPrevPage);
    this.checkForLink(1)
    this.numPage = 1
  }

  reset() {
    this.numPage = 1;
    this.getEpisodiosByPage(1);
  }

  goToPage() {
    if (
      parseInt(this.selectPage.value!) >= 1 &&
      parseInt(this.selectPage.value!) <= this.totalPages
    ) {
      this.checkForLink(this.selectPage.value!);
      this.numPage = parseInt(this.selectPage.value!);
    } else {
      this.showError('Inserte un numero de página valido.');
    }
  }

  checkForLink(newPage: string | number) {
    let newPageLink: string = '';
    if (this.linkNextPage) {
      let page = this.numPage + 1;
      let newPageLink = this.getPageForLink(this.linkNextPage, page, newPage);
      this.getEpisodioByLink(newPageLink);
    } else {
      let page = this.numPage - 1;
      newPageLink = this.getPageForLink(this.linkPrevPage, page, newPage);
      this.getEpisodioByLink(newPageLink);
    }
  }

  getPageForLink(
    linkPage: string,
    actualPage: number,
    newPage: string | number
  ) {
    return linkPage.replace(`page=${actualPage}`, `page=${newPage}`);
  }

  establecerData(result: BaseEpisodio) {
    this.totalPages = result.info.pages;
    this.totalResults = result.info.count;
    this.linkNextPage = result.info.next;
    this.linkPrevPage = result.info.prev;

    this.evalNext();
    this.evalPrev();
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
      width: '620px',
    });
  }

  showError(mensaje: string) {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      data: { mensaje },
      width: '620px',
    });
  }
}
