import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "./shared/authentication.service";

export const canNavigateToAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (authService.isLoggedIn()){
    return true;
  }else {
    window.alert("Sie müssen sich einloggen, um diese Seite zu sehen!");
    router.navigateByUrl("/");
    return false;
  }
};
