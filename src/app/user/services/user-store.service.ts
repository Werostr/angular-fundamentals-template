import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  public name$ = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    // Add your code here
    this.userService
      .getUser()
      .pipe(
        map((res) => {
          console.log(res);
          this.name$$.next(res.name);
          this.isAdmin$$.next(res.isAdmin);
        })
      )
      .subscribe();
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
