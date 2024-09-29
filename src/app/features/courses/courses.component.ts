import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  public coursesList$!: Observable<any>;
  public isAdmin!: boolean; // TODO

  constructor(
    public coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursesList$ = this.coursesStoreService.courses$;
    this.coursesStoreService.getAll().subscribe();
    this.isAdmin = this.userStoreService.isAdmin;
    //this.userStoreService.getUser().subscribe();
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
}
