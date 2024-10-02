import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoursesListComponent } from "./courses-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [CoursesListComponent],
  imports: [CommonModule, SharedModule, FontAwesomeModule],
  exports: [CoursesListComponent],
})
export class CoursesListModule {}
