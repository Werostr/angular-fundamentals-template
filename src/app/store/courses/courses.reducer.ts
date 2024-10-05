import { Course } from "@app/models/course.model";
import { Action, createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";

export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: "",
};

export const coursesReducer = createReducer(
  initialState,

  // All courses
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isSearchState: false,
    isAllCoursesLoading: false,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isAllCoursesLoading: false,
  })),

  // Single course
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  })),

  // Filtered courses
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isSearchState: true,
    isAllCoursesLoading: false,
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isAllCoursesLoading: false,
  })),

  // Delete course
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    // course: state.allCourses.find((course) => course.id === id),
    isSingleCourseLoading: true,
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
    // TESTS: add id
    ...state,
    allCourses: state.allCourses.filter((course) => course.id !== id), // TESTS: add whole line
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  })),

  // Edit course
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses.map((c) => (c.id === course.id ? course : c)),
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  })),

  // Create course
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course],
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
    isSingleCourseLoading: false,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
