import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "@app/models/course.model";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses: any = []; //TODO: Change the type to Course[]
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShowCourse(event: string) {
    this.showCourse.emit(event);
  }

  onEditCourse(event: string) {
    this.editCourse.emit(event);
  }

  onDeleteCourse(event: string) {
    this.deleteCourse.emit(event);
  }
}
