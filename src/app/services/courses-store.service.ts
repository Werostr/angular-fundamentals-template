import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  switchMap,
  tap,
} from "rxjs";
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

  getAll(): Observable<any> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      switchMap((res) => {
        console.log(res);
        return forkJoin(
          res.result.map((course: any) =>
            forkJoin(
              course.authors.map((authorId: string) =>
                this.getAuthorById(authorId)
              )
            ).pipe(map((authors) => ({ ...course, authors })))
          )
        );
      }),
      tap((full) => {
        console.log("from getAll()", full);
        this.courses$$.next(full);
        this.isLoading$$.next(false);
      })
    );
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
      switchMap((res) => {
        const course = res.result;
        return forkJoin(
          course.authors.map((authorId: string) => this.getAuthorById(authorId))
        ).pipe(map((authors) => ({ ...course, authors })));
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
    return this.coursesService.getAuthorById(id).pipe(
      map((res) => {
        return res.result.name;
      })
    );
  }
}
