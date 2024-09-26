import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  isLoggedin=false;
  constructor( private router: Router ,private permission: PermissionService) { }

  ngOnInit(): void {
  }

  //When the user wants to logout we clear the localstorage
  onLogOut(){
    this.isLoggedin = true;
    this.permission.onLogout();
  }
}
