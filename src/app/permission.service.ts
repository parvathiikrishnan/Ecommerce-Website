import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private loggedInUser: { username: string; role: string } | null = null;
  constructor() { }

  Adminlogin(username: string, password: string): boolean {
    if (username === 'johnd' && password === 'admin123') {
      this.loggedInUser = { username: 'johnd', role: 'admin' };
      return true;
    } 
    
    else{
      this.loggedInUser = { username, role: 'user' };
      return false;
    }
    
  }

  getUserRole(): string | null {
    return this.loggedInUser ? this.loggedInUser.role : null;
  }
}
