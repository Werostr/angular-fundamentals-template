import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Author } from "../../../models/author.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { map, Observable } from "rxjs";
import { Course } from "@app/models/course.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  id: string | undefined;
  isAddMode!: boolean;
  courseForm!: FormGroup;
  submitted: boolean = false;
  initialAuthors: Author[] = [];
  authorsList: Author[] = [];
  course$?: Observable<Course | null>;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStoreService: CoursesStoreService,
    private coursesStateFacade: CoursesStateFacade
  ) {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;
    if (this.id) {
      this.course$ = this.coursesStateFacade.course$;
      this.coursesStateFacade.getSingleCourse(this.id);

      this.course$.subscribe((course) => {
        if (course) {
          this.courseForm.patchValue(course);
          course.authors.forEach((author: Author) => {
            this.addCourseAuthor(author);
          });
        }
      });
      // this.coursesStoreService
      //   .getCourse(this.id)
      //   .subscribe((course: Course) => {
      //     this.courseForm.patchValue(course);
      //     course.authors.forEach((author: Author) => {
      //       this.addCourseAuthor(author);
      //     });
      //   });
    }
  }

  ngOnInit(): void {
    this.library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      author: this.fb.group({
        name: [
          null,
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]*$/)],
        ],
      }),
      authors: this.fb.array([]),
      duration: [
        null,
        [
          Validators.required,
          (minutes: AbstractControl) =>
            minutes.value < 0 ? { negativeDuration: true } : null,
        ],
      ],
    });

    this.loadInitialAuthors();
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  invalidInput(control: string): boolean {
    return (
      this.courseForm.controls[control].invalid &&
      (this.submitted || this.courseForm.controls[control].touched)
    );
  }

  loadInitialAuthors() {
    this.coursesStoreService.getAllAuthors().subscribe((authors) => {
      this.initialAuthors = authors;
      this.authorsList = [...this.initialAuthors];
    });
  }

  addCourseAuthor(author: Author): void {
    this.courseAuthors.push(this.fb.group(author));
    this.authorsList = this.authorsList.filter((a) => a.id !== author.id);
  }

  removeCourseAuthor(index: number): void {
    const author = this.courseAuthors.at(index).value;
    this.courseAuthors.removeAt(index);
    this.authorsList.push(author);
  }

  addAuthor(name: string): void {
    if (name && this.courseForm.get("author.name")?.valid) {
      this.coursesStoreService
        .createAuthor(name)
        .pipe(
          map((author: Author) => {
            this.authorsList.push(author);
          })
        )
        .subscribe();
      this.courseForm.get("author.name")?.reset();
    }
  }

  goBack(): void {
    this.router.navigate(["/courses"]);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      this.submitted = false;
      const fixedForm = {
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        duration: this.courseForm.value.duration,
        authors: this.courseForm.value.authors.map(
          (author: Author) => author.id
        ),
      };
      if (!this.isAddMode && this.id) {
        // Edits course
        this.coursesStateFacade.editCourse(fixedForm, this.id);
        //this.coursesStoreService.editCourse(this.id as string, fixedForm);
        this.router.navigate([`/courses/${this.id}`]);
      } else {
        // Ads course
        this.coursesStateFacade.createCourse(fixedForm);
        //this.coursesStoreService.createCourse(fixedForm);
        this.courseForm.reset();
      }
    }
  }
}
