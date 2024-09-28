import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { CoursesService } from "./courses.service";
import { CourseCreate } from "@app/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();

  private courses$$ = new BehaviorSubject<any[]>([]); // TODO: replace 'any' with the required interface
  public courses$ = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(
        map((res) => {
          this.courses$$.next(res.result);
          this.isLoading$$.next(false);
        })
      )
      .subscribe();
  }

  createCourse(course: CourseCreate): void {
    // replace 'any' with the required interface
    // Add your code here
    this.coursesService.createCourse(course).subscribe(() => this.getAll());
  }

  getCourse(id: string): Observable<any> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      map((res) => {
        res.result;
        console.log(res);
        this.isLoading$$.next(false);
      })
    );
  }

  editCourse(id: string, course: CourseCreate): void {
    // replace 'any' with the required interface
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService.editCourse(id, course).subscribe(() => this.getAll());
  }

  deleteCourse(id: string): void {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(id).subscribe(() => this.getAll());
  }

  filterCourses(value: string): void {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses(value)
      .pipe(
        map((res) => {
          this.courses$$.next(res.result);
          this.isLoading$$.next(false);
        })
      )
      .subscribe();
  }

  getAllAuthors(): Observable<any> {
    // Add your code here
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string): void {
    // Add your code here
    this.coursesService
      .createAuthor(name)
      .subscribe(() => this.getAllAuthors());
  }

  getAuthorById(id: string): Observable<any> {
    // Add your code here
    return this.coursesService.getAuthorById(id);
  }
}
