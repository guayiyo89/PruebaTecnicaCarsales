import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Episodio } from 'src/app/core/interfaces/episodio';

@Component({
  selector: 'app-modal-episodio',
  templateUrl: './modal-episodio.component.html',
  styleUrls: ['./modal-episodio.component.css']
})
export class ModalEpisodioComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: Episodio) { }

}
