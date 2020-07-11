import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { usersPage, Users, jobUser } from '../interfaces';
import { pokemonPage } from'../interfaces';

const api = environment.api;
const apiP = environment.apiPokemon;

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getPokemon(count?: number, page?:number): Promise<pokemonPage>{
        if (!count) {
            count = 10;
        }
        if (!page) {
            page = 1;
        }
        console.log(apiP);
        return this.http.get<pokemonPage>(`${apiP}?limit=${count}&offset=${(page-1)*count}`).toPromise();
        
    }
    

    getUsers(page?: number): Promise<usersPage> {
        if (!page) {
            page = 1;
        }
        return this.http.get<usersPage>(`${api}users?page=${page}`).toPromise();
    }

    editUser(user: jobUser, userID: number): Promise<jobUser> {
        return this.http.patch<jobUser>(`${api}users/${userID}`, user).toPromise();
    }

    createUser(user: jobUser): Promise<jobUser> {
        return this.http.post<jobUser>(`${api}users`, user).toPromise();
    }

    deleteUser(userID: number): Promise<any> {
        return this.http.delete<any>(`${api}users/${userID}`).toPromise();
    }
}