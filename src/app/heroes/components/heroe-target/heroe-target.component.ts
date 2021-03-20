import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-target',
  templateUrl: './heroe-target.component.html',
  styles: [
    `
    mat-card {
      margin-top : 20px
    }
    `
  ]
})
export class HeroeTargetComponent {

  @Input() heroe!: Heroe;
  constructor() { }

}
