import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainServicesService } from '../backend/main-services.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuardGuard implements CanActivate {
  constructor(private Backend: MainServicesService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.Backend.isLoggedIn()) {  // منطق التحقق من حالة تسجيل الدخول
      return true; // يسمح بالوصول
    } else {
      return this.router.createUrlTree(['']); // منع الوصول وتوجيه المستخدم إلى صفحة تسجيل الدخول
    }

  }

}
