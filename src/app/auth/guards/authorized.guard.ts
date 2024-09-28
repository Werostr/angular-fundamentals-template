import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  // TODO: deprecated?
  // Add your code here
  //public isAuthorized$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    //this.isAuthorized$ = this.authService.isAuthorized$;
    //this.authService.isAuthorised.subscribe();

    return this.authService.isAuthorized$.pipe(
      map((isAuthorized) => {
        if (!isAuthorized) {
          return this.router.createUrlTree(["/login"]);
        }
        return true;
      })
    );
  }
}
