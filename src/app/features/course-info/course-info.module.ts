import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseInfoComponent } from "./course-info.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [CommonModule, FontAwesomeModule, SharedModule],
  exports: [CourseInfoComponent],
})
export class CourseInfoModule {}
