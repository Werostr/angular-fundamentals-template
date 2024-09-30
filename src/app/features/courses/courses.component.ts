import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "@app/models/course.model";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  public coursesList$!: Observable<any>; // TODO
  public isAdmin: boolean = false; // TODO

  constructor(
    public coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.coursesStoreService.courses$
    //   .pipe(
    //     map((courses) => {
    //       console.log(courses);
    //       this.coursesList$ = courses;
    //     })
    //   )
    //   .subscribe();
    this.coursesList$ = this.coursesStoreService.courses$;
    this.coursesStoreService.getAll().subscribe();
    // this.coursesStoreService.getAll().subscribe((courses) => {
    //   this.coursesList$ = courses;
    // });
    // this.userStoreService.isAdmin$.pipe(
    //   map((isAdmin) => (this.isAdmin = isAdmin))
    // );
    // this.userStoreService.getUser().subscribe((isAdmin: boolean) => {
    //   console.log(isAdmin);
    //   this.isAdmin = isAdmin;
    // });
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
