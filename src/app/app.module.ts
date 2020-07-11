import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { UserService } from './services/user.services';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonsComponent } from './components/pokemons/pokemons.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EditUserComponent,
    PokemonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
