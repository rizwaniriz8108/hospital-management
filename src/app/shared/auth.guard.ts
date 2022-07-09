import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route : Router){}
  canActivate() {
    if(!!localStorage.getItem("token")){
      return true;
    }
    this.route.navigate(['/login'])
    return false;
    
  }
  
}
