import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "@app/models/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course!: Course;

  constructor(private router: Router) {}

  get authors(): string {
    return this.course.authors.map((author: any) => author.name).join(", ");
  }

  redirectBack(): void {
    this.router.navigate(["/courses"]);
  }
}
