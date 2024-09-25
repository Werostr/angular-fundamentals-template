import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "@app/models/course.model";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShowCourse(event: string) {
    console.log(event);
    this.showCourse.emit(event);
  }

  onEditCourse(event: string) {
    console.log(event);
    this.editCourse.emit(event);
  }

  onDeleteCourse(event: string) {
    console.log(event);
    this.deleteCourse.emit(event);
  }
}
