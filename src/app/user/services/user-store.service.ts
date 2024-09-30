import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  public name$ = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {
    console.log("from UserStoreService constructor");
  }

  getUser(): Observable<any> {
    // Add your code here
    return this.userService.getUser().pipe(
      map((res) => {
        console.log("from getUser()", res);
        this.name$$.next(res.result.name);
        this.isAdmin$$.next(res.result.role === "admin");
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
