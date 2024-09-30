export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

export interface CourseCreate {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}
