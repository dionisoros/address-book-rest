import {NgModule, Optional, SkipSelf} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./services/api/api.service";
import {NotificationsService} from "./services/common/notifications.service";
import {httpInterceptorProviders} from "./http-interceptors";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    // API
    ApiService,

    // common services
    NotificationsService,

    //http-interceptors
    httpInterceptorProviders
  ]
})

export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
