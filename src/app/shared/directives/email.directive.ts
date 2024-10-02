import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator } from "@angular/forms";
import { emailValidator } from "./email.validators";

@Directive({
  selector: "[emailValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  // Add your code here
  validate = emailValidator;
}
