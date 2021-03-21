import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  constructor(private router: Router,
              private authService: AuthService) { }

  login(): void{

    // Ir al backend y confirmar que el usuario exista

    // un usuario
    this.authService.login()
      .subscribe( resp => {
          if ( resp.id ){
            this.router.navigate(['./heroes']);
          }
      });

    //this.router.navigate(['./heroes']);
  }

  

}
