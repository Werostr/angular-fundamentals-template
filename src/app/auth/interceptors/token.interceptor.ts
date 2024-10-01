import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { SessionStorageService } from "../services/session-storage.service";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // Add your code here
  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sessionStorageService.getToken();
    let request = req;

    if (token !== null) {
      request = req.clone({
        setHeaders: {
          Authorization: `${token as string}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(["/login"]);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
