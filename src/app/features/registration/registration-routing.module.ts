import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";

const routes: Routes = [
  {
    path: "",
    component: RegistrationComponent,
    canActivate: [NotAuthorizedGuard],
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
