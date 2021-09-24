import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
interface usernameAvailableResponse {
  available: boolean;
}
interface SigninCredentials{
  username:string
  password:string
}
interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string
}
interface SignedinResponse {
  authenticated: boolean;
  username: string
}
interface SigninResponse{
  username :string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //signedin$ is an observable
  signedin$ = new BehaviorSubject<boolean|null>(null);

  rootUrl = 'https://api.angular-email.com';
  username = '';
  constructor(private http: HttpClient) { }
  usernameAvailable(username: string) {
    return this.http.post<usernameAvailableResponse>(`${this.rootUrl}/auth/username`, {
      username
    });
  }
  signup(credentials: { email: string }) {
    return this.http.post<SignupCredentials>(
      this.rootUrl + '/auth/signup', credentials
    ).pipe(
      tap(({username}) => {
        this.signedin$.next(true);
        this.username = username
      })
    );
  }
  // {withcredentials:true} respect any cookies that recieved by server
  //signedin check
  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username =username;
        })
      );
  }
  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`,{})
    .pipe(
      tap(()=>{
        this.signedin$.next(false);
      })
    )
  }
  signin(credentials:SigninCredentials){
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`,credentials)
    .pipe(
      tap(({username})=>{
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }
}
