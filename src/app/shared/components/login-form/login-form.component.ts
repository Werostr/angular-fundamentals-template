import { Component, ViewChild } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";

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

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitted = false;
      console.log(this.loginForm.value);
      this.loginForm.reset();
    }
  }
}
