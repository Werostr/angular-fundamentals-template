import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private baseUrl: string = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    // Add your code here
    return this.http.get(`${this.baseUrl}/courses/all`);
  }

  createCourse(course: any): Observable<any> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post(`${this.baseUrl}/courses/add`, course);
  }

  editCourse(id: string, course: any): Observable<any> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.put(`${this.baseUrl}/courses/${id}`, course);
  }

  getCourse(id: string): Observable<any> {
    // Add your code here
    return this.http.get(`${this.baseUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    // Add your code here
    return this.http.delete(`${this.baseUrl}/courses/${id}`);
  }

  filterCourses(value: string): Observable<any> {
    // Add your code here
    return this.http.get(`${this.baseUrl}/courses/filter?value=${value}`);
  }

  getAllAuthors(): Observable<any> {
    // Add your code here
    return this.http.get(`${this.baseUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<any> {
    // Add your code here
    return this.http.post(`${this.baseUrl}/authors/add`, name);
  }

  getAuthorById(id: string): Observable<any> {
    // Add your code here
    return this.http.get(`${this.baseUrl}/authors/${id}`);
  }
}
