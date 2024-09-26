import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Import Router
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private permission: PermissionService){}
  canActivate(): boolean{
    //get the permission service hasRole function
    if(this.permission.hasRole('admin')){
      return true;
    }

    else if(this.permission.hasRole('editor')){
      return true;
    }
      this.router.navigate(['unauthorized']);
      return false;
  }
  
}
