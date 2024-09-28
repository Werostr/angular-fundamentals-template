import { Component, Input } from "@angular/core";
import { Course } from "@app/models/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course!: any; // TODO: Change the type to Course
}
