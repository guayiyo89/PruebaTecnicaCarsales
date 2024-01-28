import { Pipe, PipeTransform } from '@angular/core';
import { meses } from '../constants/meses.constant';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fechaIngles: any): any {
    let fecha = fechaIngles.split(',')[0]
    let anio = fechaIngles.split(',')[1]

    let mes = this.mesEspanol(fecha.split(' ')[0])
    let dia = fecha.split(' ')[1]
    return `${dia} de ${mes} de ${anio}`;
  }

  mesEspanol(mesIngles: string) {
    const mesTraducido = meses.find(mes => mes.english === mesIngles);
    return mesTraducido ? mesTraducido.espanol : 'Mes no encontrado';
  }

}
