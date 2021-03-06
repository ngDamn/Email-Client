import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree,Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from './auth.service';
import {take,skipWhile,tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
 constructor(private authService: AuthService,
  private router:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {
    return this.authService.signedin$.pipe(
      skipWhile<any>(value=>value === null),
      take(1),
      tap((authenticated)=>{
        if(!authenticated){
          this.router.navigateByUrl('/');
        }
      })
    );
    };
}
