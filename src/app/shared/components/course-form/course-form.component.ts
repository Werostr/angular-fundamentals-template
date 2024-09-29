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
import { v4 as uuidv4 } from "uuid";
import { Author } from "../../../models/author.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserStoreService } from "@app/user/services/user-store.service";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { first } from "rxjs";

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
  initialAuthors: Author[] = [
    //TODO: static?
    { id: uuidv4(), name: "Author One" },
    { id: uuidv4(), name: "Author Two" },
  ];
  authorsList: Author[] = [...this.initialAuthors];

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStoreService: CoursesStoreService
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;
    console.log(this.id);
    console.log(this.isAddMode);

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

    if (this.id) {
      this.coursesStoreService.getCourse(this.id).subscribe((course) => {
        console.log(course), this.courseForm.patchValue(course);
      });
    }
  }

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  get courseAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
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
      const newAuthor = { id: uuidv4(), name };
      this.authorsList.push(newAuthor);
      this.initialAuthors.push(newAuthor);
      this.courseForm.get("author.name")?.reset();
      console.log(name);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      this.submitted = false;
      if (this.isAddMode) {
        this.coursesStoreService.createCourse(this.courseForm.value);
      } else {
        this.coursesStoreService.editCourse(
          this.id as string,
          this.courseForm.value
        );
      }
      this.courseForm.reset();
    }
  }
}
