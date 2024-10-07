import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import * as CoursesActions from "./courses.actions";
import * as CoursesSelectors from "./courses.selectors";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { CoursesService } from "@app/services/courses.service";
//import { CoursesStateFacade } from "./courses.facade";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";

@Injectable()
export class CoursesEffects {
  constructor(
    private store: Store<CoursesState>,
    private router: Router,
    private actions$: Actions,
    private coursesService: CoursesService //private coursesStateFacade: CoursesStateFacade
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map(
            (courses) => CoursesActions.requestAllCoursesSuccess({ courses }) // TESTS: remove courses.result
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      //withLatestFrom(this.coursesStateFacade.allCourses$),
      concatLatestFrom(() => this.store.select("allCourses")),
      mergeMap(([action, allCourses]) => {
        const filteredCourses = allCourses.filter((course) =>
          course.title.includes(action.title)
        );
        return of(
          CoursesActions.requestFilteredCoursesSuccess({
            courses: filteredCourses,
          })
        );
      }),
      catchError((error) =>
        of(CoursesActions.requestFilteredCoursesFail({ error }))
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map(
            (course) => CoursesActions.requestSingleCourseSuccess({ course }) // TESTS: remove courses.result
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(
            () => CoursesActions.requestDeleteCourseSuccess() // TESTS: remove {id: action.id}
          ),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((course) => CoursesActions.requestEditCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course) =>
            CoursesActions.requestCreateCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        map(() => {
          this.router.navigate(["/courses"]);
        })
      ),
    { dispatch: false }
  );
}
