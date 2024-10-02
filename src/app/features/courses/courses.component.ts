import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "@app/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { map, Observable, of } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  public coursesList$!: Observable<Course[]>;
  public isAdmin$!: Observable<boolean>;

  constructor(
    public coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = this.userStoreService.isAdmin$;

    this.coursesList$ = this.coursesStoreService.courses$;
    this.coursesStoreService.getAll().subscribe();
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
    this.coursesStoreService.deleteCourse(id);
  }
  onSearch(searchTerm: string): void {
    this.coursesStoreService.filterCourses(searchTerm).subscribe();
  }
}
