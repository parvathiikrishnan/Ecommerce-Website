import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private loggedInUser: { username: string; role: string } | null = null;
  constructor(private router: Router,) { }
  
  //Assigning roles to users
  RoleAssigner() {
    const username = localStorage.getItem('username')
    if (username === 'johnd') {
      this.loggedInUser = { username: 'johnd', role: 'admin' }; 
    } 
    
    else if (username === 'mor_2314') {
      this.loggedInUser = { username: 'mor_2314', role: 'editor' };
    } 
    
    else{
      this.loggedInUser = { username, role: 'user' };
    }
    
    localStorage.setItem('role',this.loggedInUser.role ) 
  }

  //Getting role from local storage
  hasRole(role): boolean{
    const storredRole = localStorage.getItem('role')
    return storredRole === role;
  }

  onLogout(){
    localStorage.clear();
  }
}
