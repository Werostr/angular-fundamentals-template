import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "@app/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { Observable } from "rxjs";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.css"],
})
export class CourseDetailsComponent implements OnInit {
  public course$: Observable<Course | null>;
  //course!: Course;
  id!: string;

  constructor(
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute,
    private coursesStateFacade: CoursesStateFacade
  ) {
    this.course$ = this.coursesStateFacade.course$;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.coursesStateFacade.getSingleCourse(this.id);
    // this.coursesStoreService.getCourse(this.id).subscribe((res) => {
    //   this.course = res;
    // });
  }
}
