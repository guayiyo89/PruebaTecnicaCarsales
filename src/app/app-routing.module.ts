import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodiosComponent } from './components/episodios/episodios.component';
import { PersonajesComponent } from './components/personajes/personajes.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './core/shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'episodios', component: EpisodiosComponent },
  { path: 'personajes', component: PersonajesComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
