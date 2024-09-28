import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  public coursesList$!: Observable<any>;

  constructor(
    public coursesStoreService: CoursesStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursesList$ = this.coursesStoreService.courses$;
    this.coursesStoreService.getAll();
  }

  redirectToAddCourse(): void {
    this.router.navigate(["/courses/add"]);
  }
}
