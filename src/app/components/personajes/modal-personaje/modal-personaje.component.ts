import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Personaje } from 'src/app/core/interfaces/personaje';

@Component({
  selector: 'app-modal-personaje',
  templateUrl: './modal-personaje.component.html',
  styleUrls: ['./modal-personaje.component.css']
})
export class ModalPersonajeComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Personaje) { }

}
