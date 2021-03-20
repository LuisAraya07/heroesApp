import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    // Este es el path que se va a definir en el principal para obtener todo el modulo/rutas del auth
    path: 'auth',
    // Se importa el modulo, no el routing module respectivo, esto porque ya el modulo lo tiene importado
    loadChildren: () => import('./auth/auth.module')
                        .then( m => m.AuthModule)
  },
  {
    // Este es el path que se va a definir en el principal para obtener todo el modulo/rutas de heroes
    path: 'heroes',
    // Se importa el modulo, no el routing module respectivo, esto porque ya el modulo lo tiene importado
    loadChildren: () => import('./heroes/heroes.module')
                        .then( m => m.HeroesModule)
  },
  {
    path: '404',
    // Se puede utilizar este componente porque es global, el app.module lo declara
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
