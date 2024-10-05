import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "@app/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import { map, Observable, of } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  public allCourses$!: Observable<Course[]>;
  public courses$!: Observable<Course[]>;
  public isAdmin$!: Observable<boolean>;

  constructor(
    public coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router,
    private coursesStateFacade: CoursesStateFacade
  ) {
    this.allCourses$ = this.coursesStateFacade.allCourses$;
    this.courses$ = this.coursesStateFacade.courses$;
    this.isAdmin$ = this.userStoreService.isAdmin$;
  }

  ngOnInit(): void {
    this.coursesStateFacade.getAllCourses();
    //this.coursesList$ = this.coursesStoreService.courses$;
    //this.coursesStoreService.getAll().subscribe();
  }

  redirectToAddCourse(): void {
    this.router.navigate(["/courses/add"]);
  }

  onShow(id: string): void {
    this.router.navigate([`/courses/${id}`]);
  }

  onEdit(id: string): void {
    this.router.navigate([`/courses/edit/${id}`]);
  }
  onDelete(id: string): void {
    this.coursesStateFacade.deleteCourse(id);
    //this.coursesStoreService.deleteCourse(id);
  }
  onSearch(searchTerm: string): void {
    this.coursesStateFacade.getFilteredCourses(searchTerm);
    //this.coursesStoreService.filterCourses(searchTerm).subscribe();
  }
}
