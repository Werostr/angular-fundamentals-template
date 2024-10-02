import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CoursesRoutingModule } from "./courses-routing.module";
import { CoursesComponent } from "./courses.component";
import { CoursesAddComponent } from "./courses-add/courses-add.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CourseInfoComponent } from "../course-info/course-info.component";
import { CourseDetailsComponent } from './course-details/course-details.component';

// What is the purpose of this module?
@NgModule({
  declarations: [
    CoursesComponent,
    CoursesAddComponent,
    CoursesListComponent,
    CourseInfoComponent,
    CourseDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    CoursesRoutingModule,
  ],
})
export class CoursesModule {}
