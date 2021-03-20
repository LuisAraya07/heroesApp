import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img{
        width : 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AddComponent implements OnInit {

  heroe: Heroe = {
    superhero : '',
    alter_ego: '',
    characters: '',
    alt_img: '',
    publisher: Publisher.DCComics,
    first_appearance: ''
  };
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  constructor( private heroeService: HeroesService,
                private activatedRoute : ActivatedRoute,
                private router: Router,
                private snackbar: MatSnackBar,
                private matDialog: MatDialog ) { }

  ngOnInit(): void {
    if( this.router.url.includes('edit')){
      this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id))
      )
      .subscribe( heroe => this.heroe = heroe);
    }
  }

  save(){
    if ( this.heroe.superhero.trim().length === 0 ){
      return;
    }
    if (this.heroe.alt_img?.trim().length === 0){
      return this.showSnackBar('Url image is required');
    }
    if ( this.heroe.id ){
     // Actualizamos
     this.heroeService.updateHeroe(this.heroe)
      .subscribe( heroe => this.showSnackBar('Updated register'))
    }else{
      // Creamos
      this.heroeService.addHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/edit', heroe.id]);
        this.showSnackBar('Register Created');
      } );

    }
  }

  delete(): void{
    const dialog = this.matDialog.open( ConfirmComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    dialog.afterClosed()

      .pipe(
        // tslint:disable-next-line: no-non-null-assertion
        switchMap( ( result ) => (result) ? this.heroeService.deleteHeroe(this.heroe.id!) : new BehaviorSubject(false))
         )
      .subscribe( ( res ) => {
        console.log(res);
        if(res){
          this.router.navigate(['/heroes']);
        }
      });



    
  }


  showSnackBar( msg: string ): void{
    this.snackbar.open( msg,'Cerrar', {
      duration: 2500
    });
  }
}
