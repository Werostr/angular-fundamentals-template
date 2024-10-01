import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { User, UserLogin } from "@app/models/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    this.isAuthorized$$.next(!!this.sessionStorageService.getToken());
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post("http://localhost:4000/login", user).pipe(
      tap((response: any) => {
        if (response.successful) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);
          this.router.navigate(["/courses"]);
        }
      })
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${this.sessionStorageService.getToken()}`,
    });
    return this.http.delete("http://localhost:4000/logout", { headers }).pipe(
      tap(() => {
        this.sessionStorageService.deleteToken();
        this.isAuthorized$$.next(false);
        this.router.navigate(["/login"]);
      })
    );
  }

  register(user: User): void {
    this.http.post("http://localhost:4000/register", user).subscribe();
  }

  get isAuthorised(): boolean {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    // Add your code here
    return "/login";
  }
}
