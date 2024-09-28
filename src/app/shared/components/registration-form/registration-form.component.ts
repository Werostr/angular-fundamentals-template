import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.authService.register(this.registrationForm.value);
      this.registrationForm.reset();
      this.submitted = false;
      this.router.navigate(["/login"]);
    }
  }
}
