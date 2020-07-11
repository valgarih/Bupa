import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { usersPage, Users } from 'src/app/interfaces';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    public titulo;
    public users: Array<Users>;
    public tableConfig: {
        itemsPerPage: number;
        currentPage: number;
        totalItems: number;
    };

    constructor(private userServ: UserService, private router: Router) {
        // this.titulo = ' ';
        this.users= [];
    }

    async ngOnInit() {
        const usersPage: usersPage = await this.userServ.getUsers();    
        this.tableConfig = {
            itemsPerPage: usersPage.per_page,
            currentPage: 1,
            totalItems: usersPage.total   
        }
        this.users = _.uniqBy(_.concat(this.users, usersPage.data), 'id');
        console.log(this.users);
    }
    
    async pageChanged(page:number){
        const usersPage: usersPage = await this.userServ.getUsers(page);
        this.users = _.uniqBy(_.concat(this.users, usersPage.data), 'id');
        this.tableConfig.currentPage = page;
        console.log('pagina: ',page);
    }

    async deleteUser(user: Users) {
        _.remove(this.users, (eachUser: Users) => {
            return eachUser.id === user.id;
        })
        await this.userServ.deleteUser(user.id).finally(() => {
            console.log('Aquí va un toast de que se elimino bien')
        });
    }

}