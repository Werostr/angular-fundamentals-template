import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

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
    // QUESTION: which way is better, this or from authorized.guard.ts?
    if (!this.authService.isAuthorised) return true;
    else return this.router.createUrlTree(["/courses"]);
  }
}
