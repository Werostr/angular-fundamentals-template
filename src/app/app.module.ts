import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from "@app/app.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { WindowProvider } from "./auth/services/window.service";
import { StoreModule } from "@ngrx/store";
import { effects, reducers } from "./store/index";
import { EffectsModule } from "@ngrx/effects";
import { CoursesStateFacade } from "./store/courses/courses.facade";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    //CoursesStateFacade, TESTS: remove this line
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    //{ provide: Window, useValue: window },
    WindowProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
