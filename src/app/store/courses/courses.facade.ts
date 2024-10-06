import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as CoursesSelectors from "./courses.selectors";
import * as CoursesActions from "./courses.actions";
import { CoursesState } from "./courses.reducer";
import { Observable } from "rxjs";
import { Course, CourseCreate } from "@app/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  constructor(private store: Store<CoursesState>) {}

  public isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );

  public isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );

  public isSearchingState$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );

  public courses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getCourses)
  );

  public allCourses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getAllCourses)
  );

  public course$: Observable<Course | null> = this.store.pipe(
    select(CoursesSelectors.getCourse)
  );

  public errorMessage$: Observable<string> = this.store.pipe(
    select(CoursesSelectors.getErrorMessage)
  );

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CoursesActions.requestFilteredCourses({ title: searchValue })
    );
  }

  editCourse(body: CourseCreate, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
  }

  createCourse(body: CourseCreate): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
