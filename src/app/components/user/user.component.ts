import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.services';
import { usersPage, Users, jobUser } from 'src/app/interfaces';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    public titulo;
    public users: Array<Users>;
    public jobU: Array<jobUser>;
    public tableConfig: {
        itemsPerPage: number;
        currentPage: number;
        totalItems: number;
    };


    constructor(private userServ: UserService, private router: Router) {
        this.users = [];

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

    async pageChanged(page: number) {
        const usersPage: usersPage = await this.userServ.getUsers(page);
        this.users = _.uniqBy(_.concat(this.users, usersPage.data), 'id');
        this.tableConfig.currentPage = page;
        console.log('pagina: ', page);
    }


    async deleteUser(user: Users) {
        _.remove(this.users, (eachUser: Users) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El usuario se elimino correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            return eachUser.id === user.id;
        })
        await this.userServ.deleteUser(user.id).finally(() => {
            console.log('Aquí va un toast de que se elimino bien')
        });
    }

    async InfoUsuario(user: Users) {
        var str1 = new String(user.first_name);
        var str2 = new String(user.last_name);
        var str3 = str1.concat(str2.toString());
        var str4 = new String(" ");
        var str5 = str3.concat(str4.toString());
        var str6 = new String(user.email);
        var str7 = str5.concat(str6.toString());
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            imageUrl: user.avatar,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            title: str7,
            showConfirmButton: false,
            timer: 1500
        })
    }

}