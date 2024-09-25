import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
  /* Add your code here */
  {
    path: "",
    loadChildren: () =>
      import("./features/course-info/course-info.module").then(
        (m) => m.CourseInfoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
