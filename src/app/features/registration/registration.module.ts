import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../../shared/shared.module";
import { RegistrationComponent } from "./registration.component";
import { RegistrationRoutingModule } from "./registration-routing.module";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    RegistrationRoutingModule,
  ],
})
export class RegistrationModule {}
