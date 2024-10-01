import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  public name$ = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {
    console.log(this.isAdmin$);
  }

  getUser(): Observable<any> {
    // Add your code here
    return this.userService.getUser().pipe(
      tap((res) => {
        this.name$$.next(res.result.name);
        this.isAdmin$$.next(res.result.role === "admin");
      }),
      catchError((error) => {
        console.log("Error from getUser()", error);
        this.name$$.next("");
        this.isAdmin$$.next(false);
        return of(null);
      })
    );
  }

  get isAdmin() {
    // Add your code here. Get isAdmin$$ value
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
    this.isAdmin$$.next(value);
  }
}
