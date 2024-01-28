import { Component, OnInit } from '@angular/core';
import { PersonajesService } from 'src/app/core/services/personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {
  numPage: number
  totalPages: number

  constructor(private personajeSvc: PersonajesService) { 
    this.numPage = 1
    this.totalPages = 1
  }

  ngOnInit() {
  }

}
