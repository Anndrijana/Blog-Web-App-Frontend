import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: string;
  auth: boolean;
  role: string;

  constructor(private userService: UserService, private router: Router) { 
    this.token = localStorage.getItem('token');
    if (this.token != null){
      this.auth = true;
      this.role = userService.getRole(this.token);
    }else{
      this.auth = false;
    }
  }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
    this.router.navigate(['posts']);
  }

}
