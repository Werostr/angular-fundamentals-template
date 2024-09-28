import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserStoreService } from "../services/user-store.service";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  // Add your code here
  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.userStoreService.isAdmin$.pipe(
      map((isAdmin) => {
        if (!isAdmin) {
          return this.router.createUrlTree(["/courses"]);
        }
        return true;
      })
    );
  }
}
