import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private loggedInUser: { username: string; role: string } | null = null;
  constructor() { }
  
  //checking the role of a username
  Adminlogin() {
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

 
  
  //get role
  hasRole(role): boolean{
    const storredRole = localStorage.getItem('role')
    return storredRole === role;
    
  }
}
