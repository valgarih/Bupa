import { Component, OnInit } from '@angular/core';
import { pokemonPage } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.services';
import * as _ from 'lodash';

const limit = 1000;
@Component({
  selector: 'pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  public pokemons: pokemonPage['results'];
  public tableConfig: {
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
  };

  constructor(private userServ: UserService) { 
    this.pokemons = [];
    this.tableConfig = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 1
  }
  }
  

  async ngOnInit(): Promise<void> {
    const pokemonPage: pokemonPage = await this.userServ.getPokemon(limit);
    this.pokemons = _.uniqBy(_.concat(this.pokemons, pokemonPage.results), 'url');
    this.tableConfig.totalItems = pokemonPage.count;
        
  }

  async pageChanged(page:number){
    const pokemonPage: pokemonPage = await this.userServ.getPokemon(limit,page);
    this.pokemons = _.uniqBy(_.concat(this.pokemons, pokemonPage.results), 'url');
    this.tableConfig.currentPage = page;
    console.log(this.pokemons);
}

}

