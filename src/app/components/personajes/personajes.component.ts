import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Personaje, BasePersonaje } from 'src/app/core/interfaces/personaje';
import { PersonajesService } from 'src/app/core/services/personajes.service';
import { ModalErrorComponent } from 'src/app/shared/modal-error/modal-error.component';
import { ModalPersonajeComponent } from './modal-personaje/modal-personaje.component';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {
  numPage: number;
  totalPages: number;
  totalResults: number;
  personajes: Personaje[];
  linkNextPage: string;
  linkPrevPage: string;
  disablePrev = true;
  disableNext = false;
  filterText = new FormControl('');
  selectPage = new FormControl('');
  status = new FormControl('');

  constructor(private personajeSvc: PersonajesService, public dialog: MatDialog) {
    this.numPage = 1;
    this.totalPages = 1;
    this.totalResults = 0;
    this.personajes = [];
    this.linkNextPage = '';
    this.linkPrevPage = '';
  }

  ngOnInit() {
    this.getPersonajesByPage(this.numPage);
  }

  getPersonajesByPage(page: number) {
    this.personajeSvc.getPersonajesByPage(page).subscribe({
      next: (res) => {
        this.establecerData(res);
        this.personajes = res.results;
        this.selectPage.reset()
      },
      error: (_err) => {
        this.showError('Fallo de servicio.');
      },
    });
  }

  getPersonajeByLink(url: string) {
    this.personajeSvc.getPersonajesByLink(url).subscribe({
      next: (res) => {
        this.establecerData(res);
        this.personajes = res.results;
        this.selectPage.reset()
      },
      error: (_err) => {
        this.showError('Fallo de servicio.');
      },
    });
  }

  filterPersonajes() {
    let texto = this.filterText.value!;
    let state = this.status.value!
    this.numPage = 1;
    this.personajeSvc.getPersonajeByName(texto, 1, state).subscribe({
      next: (res) => {
        this.establecerData(res);
        this.personajes = res.results;
        this.selectPage.reset()
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
    this.getPersonajeByLink(this.linkNextPage);
  }

  prevPage() {
    this.numPage -= 1;
    this.evalNext();
    this.evalPrev();
    this.getPersonajeByLink(this.linkPrevPage);
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
    this.getPersonajesByPage(1);
    this.selectPage.reset()
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
      this.getPersonajeByLink(newPageLink);
    } else {
      let page = this.numPage - 1;
      newPageLink = this.getPageForLink(this.linkPrevPage, page, newPage);
      this.getPersonajeByLink(newPageLink);
    }
  }

  getPageForLink(
    linkPage: string,
    actualPage: number,
    newPage: string | number
  ) {
    return linkPage.replace(`page=${actualPage}`, `page=${newPage}`);
  }

  establecerData(result: BasePersonaje) {
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

  showPersonaje(item: Personaje) {
    const dialogRef = this.dialog.open(ModalPersonajeComponent, {
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
