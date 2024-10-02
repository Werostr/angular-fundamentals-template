import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { CoursesService } from "./courses.service";
import { Course, CourseCreate } from "@app/models/course.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Author } from "@app/models/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();

  private courses$$ = new BehaviorSubject<any[]>([]); // TODO: replace 'any' with the required interface
  public courses$ = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService, private router: Router) {}

  getAll(): Observable<Course[]> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      switchMap((res) => {
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
      tap((fixedCourses: any) => {
        this.courses$$.next(fixedCourses);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.handleError(error);
        this.courses$$.next([]);
        return of([]);
      })
    );
  }

  createCourse(course: CourseCreate): void {
    // replace 'any' with the required interface
    // Add your code here
    this.coursesService.createCourse(course).subscribe((res) => {
      console.log(res);
      this.router.navigate(["/courses"]);
      this.getAll();
    });
  }

  getCourse(id: string): Observable<Course> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      switchMap((res) => {
        const course = res.result;
        return forkJoin(
          course.authors.map((authorId: string) =>
            this.getAuthorById(authorId).pipe(
              map((authorName) => ({ id: authorId, name: authorName }))
            )
          )
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

  filterCourses(value: string): Observable<Course[]> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(value).pipe(
      switchMap((res) => {
        if (res.result.length === 0) {
          return of([]);
        }
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
      tap((res: any) => {
        this.courses$$.next(res);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.handleError(error);
        this.courses$$.next([]);
        return of([]);
      })
    );
  }

  getAllAuthors(): Observable<Author[]> {
    // Add your code here
    return this.coursesService.getAllAuthors().pipe(map((res) => res.result));
  }

  createAuthor(name: string): Observable<Author> {
    // Add your code here
    return this.coursesService
      .createAuthor(name)
      .pipe(map((res) => res.result));
  }

  getAuthorById(id: string): Observable<string> {
    // Add your code here
    return this.coursesService.getAuthorById(id).pipe(
      map((res) => {
        return res.result.name;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("In handle error");
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
