import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";
import { UserStoreService } from "./user/services/user-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    // this.userStoreService.getUser().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
    console.log("Logout");
    //this.userStoreService.getUser().subscribe();
  }
}
