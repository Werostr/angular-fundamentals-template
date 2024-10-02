import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { emailValidator } from "@app/shared/directives/email.validators";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, emailValidator]],
      password: ["", Validators.required],
    });
  }

  inputError(control: string): boolean {
    return (
      this.registrationForm.controls[control].invalid &&
      (this.submitted || this.registrationForm.controls[control].touched)
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.registrationForm.reset();
      this.submitted = false;
    }
  }
}
