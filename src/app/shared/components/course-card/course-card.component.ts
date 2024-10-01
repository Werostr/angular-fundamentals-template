import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "@app/models/course.model";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() editable!: boolean;

  @Output() clickOnShow = new EventEmitter<string>();

  onShowCourse(event: string) {
    this.clickOnShow.emit(event);
  }
}
