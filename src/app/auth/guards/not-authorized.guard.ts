import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  // Add your code here
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthorized$.pipe(
      map((isAuthorized) => {
        if (isAuthorized) {
          return this.router.createUrlTree(["/courses/add"]); //TODO: Change this to /courses
        } else {
          return true;
        }
      })
    );
  }
}
