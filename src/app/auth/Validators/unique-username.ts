import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl } from "@angular/forms";
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { AuthService } from "../auth.service";
@Injectable({
  providedIn: 'root'
  // enable the class to use Dependency Injection
})
export class UniqueUsername implements AsyncValidator {
  // dependency injection used to get access to Http client
  constructor(private authService: AuthService) { }

  validate = (control: AbstractControl):any => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map(value => {
        if (value.available) {
          return null;
        }
      }),
      catchError(err => {
        console.log(err);
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true })
        }

      })
    );
  };
}
