import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private router: Router) { 
    this.user = new User();
  }

  ngOnInit() {
  }

  signup(){
    this.userService.signup(this.user)
      .subscribe(
          res => {
            this.user = res;
            this.router.navigate(['login']);
        },
        err => alert('User with ' +  this.user.email + ' already exists.')
      );
  }

}
