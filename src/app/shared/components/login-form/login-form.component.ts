import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value);
      console.log("from onLogin after login");
      this.userStoreService.getUser().subscribe();
      this.loginForm.reset();
    } else {
      console.log("Invalid form");
    }
  }
}
