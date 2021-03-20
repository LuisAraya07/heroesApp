import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5%;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe !: Heroe;
  constructor( private activatedRoute: ActivatedRoute,
                // tslint:disable-next-line: align
                private httpService: HeroesService,
                private router: Router ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( (  { id }  ) => this.httpService.getHeroeById( id ))
    )
    // tslint:disable-next-line: deprecation
    .subscribe( ( heroe ) => {
            this.heroe = heroe;
          });
  }


  back(): void{
    this.router.navigate(['/heroes/list']);
  }

}
