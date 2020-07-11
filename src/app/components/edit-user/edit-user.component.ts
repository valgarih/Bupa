import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users, jobUser } from 'src/app/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.services';
 
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public userID: Users['id'];
  public editForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private userSer: UserService) {
    this.route.queryParams.subscribe((params: Users) => {
      if ( params && params.id) {
        this.userID = params.id;
      }
    });
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  async edit() {
    let newUser: jobUser;
    if (this.userID) {
      newUser = await this.userSer.editUser(this.editForm.value, this.userID);
    } else {
      newUser = await this.userSer.createUser(this.editForm.value);
    }
    console.log(newUser)
  }

}
