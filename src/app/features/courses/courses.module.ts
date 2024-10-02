import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CoursesListModule } from "./courses-list/courses-list.module";

// What is the purpose of this module?
@NgModule({
  imports: [CommonModule, SharedModule, FontAwesomeModule, CoursesListModule],
})
export class CoursesModule {}
