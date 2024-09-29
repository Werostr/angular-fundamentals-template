import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "@app/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.css"],
})
export class CourseDetailsComponent implements OnInit {
  course$!: Observable<any>; // TODO: Change the type to Course
  id!: string;

  constructor(
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.coursesStoreService.getCourse(this.id).subscribe((res) => {
      console.log(res), (this.course$ = res);
    });
    //this.course$ = this.coursesStoreService.getCourse(this.id);
    // { next: (course) => (this.course$ = course) }
  }
}
