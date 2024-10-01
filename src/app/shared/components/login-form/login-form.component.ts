import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { map } from "rxjs";

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
  submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {}

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(map(() => this.userStoreService.getUser().subscribe()))
        .subscribe();
      this.submitted = false;
      this.loginForm.reset();
    } else {
      console.log("Invalid form");
    }
  }
}
