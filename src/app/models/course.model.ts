import { Author } from "./author.model";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: Author[];
}

export interface CourseCreate {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}
