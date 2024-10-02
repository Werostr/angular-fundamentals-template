import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";
import { UserStoreService } from "./user/services/user-store.service";
import { map, Observable, tap } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  name$!: Observable<string>;
  isAuthorized$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {
    this.name$ = this.userStoreService.name$;
    this.userStoreService.getUser().subscribe();
    this.isAuthorized$ = this.authService.isAuthorized$;
  }

  onLogin(): void {
    this.router.navigate(["/login"]);
  }

  onLogout(): void {
    this.authService
      .logout()
      .pipe(
        tap(() => {
          this.userStoreService.getUser().subscribe();
        })
      )
      .subscribe();
  }
}
