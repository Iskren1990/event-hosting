import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Url } from 'url';

@Injectable()
export class AccessGuard implements CanActivateChild {

  constructor(
    private userData: UserService,
    private router: Router
  ) { }
  canActivateChild( childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if(childRoute.data.accessControl === true) {
      if(this.userData.isLogged === true){
        return true;
      }
      return this.router.navigateByUrl("/home");
    }
    return true;
  }
}
