import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

const routes: Routes = [
  /* Add your code here */
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./features/registration/registration.module").then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  { path: "", redirectTo: "courses", pathMatch: "full" },
  { path: "**", redirectTo: "courses" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
