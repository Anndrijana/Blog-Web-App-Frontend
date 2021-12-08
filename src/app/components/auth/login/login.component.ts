import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
    private router: Router) {
      this.user = new User();
  }

  ngOnInit() {
  }

  login(){
    localStorage.removeItem('token');
    this.userService.login(this.user.email, this.user.password)
        .subscribe(
          res => 
          {
            console.log(res);
            localStorage.setItem('token', res);
            
            if (this.userService.getRole(res) === 'ADMIN'){
              this.router.navigate(['posts/all']);
            } else{
              this.router.navigate(['posts']);
            }
          },
          err => alert("Incorrect email or password")
        );
  }

}
