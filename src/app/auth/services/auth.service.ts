import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { User, UserLogin } from "@app/models/user.model";
import { Router } from "@angular/router";
import { UserStoreService } from "@app/user/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}

  login(user: UserLogin): void {
    // replace 'any' with the required interface
    // Add your code here
    this.http
      .post("http://localhost:4000/login", user)
      .pipe(
        map((response: any) => {
          // TODO: Replace 'any' with the right type
          if (response.successful) {
            this.sessionStorageService.setToken(response.result);
            this.isAuthorized$$.next(true);
            this.router.navigate(["/courses"]);
          }
        })
      )
      .subscribe();
  }

  logout(): void {
    // Add your code here
    this.sessionStorageService.deleteToken();
    this.isAuthorized$$.next(false);
  }

  register(user: User): void {
    // replace 'any' with the required interface
    // Add your code here
    this.http
      .post("http://localhost:4000/register", user)
      .subscribe((res) => console.log(res));
  }

  get isAuthorised(): boolean {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.value;
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
