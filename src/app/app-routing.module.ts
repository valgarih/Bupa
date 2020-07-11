import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: UserComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
  { path: 'edit', component: EditUserComponent },
  { path: 'pokemons', component: PokemonsComponent },
  { path: '**', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
