import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "@app/user/guards/admin.guard";
import { CoursesComponent } from "./courses.component";
import { CoursesAddComponent } from "./courses-add/courses-add.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";

const routes: Routes = [
  {
    path: "",
    component: CoursesComponent,
    pathMatch: "full",
  },
  { path: "add", component: CoursesAddComponent, canActivate: [AdminGuard] },
  { path: ":id", component: CourseDetailsComponent },
  {
    path: "edit/:id",
    component: CoursesAddComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
