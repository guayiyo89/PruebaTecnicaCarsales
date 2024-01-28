import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './core/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { EpisodiosComponent } from './components/episodios/episodios.component';
import { PersonajesComponent } from './components/personajes/personajes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FechaPipe } from './core/pipes/fecha.pipe';
import { ModalEpisodioComponent } from './components/episodios/modal-episodio/modal-episodio.component';
import { ModalPersonajeComponent } from './components/personajes/modal-personaje/modal-personaje.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalEpisodioComponent,
    ModalPersonajeComponent,
    EpisodiosComponent,
    PersonajesComponent,
    FechaPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
