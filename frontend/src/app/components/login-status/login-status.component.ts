import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // fetch the logged in user details

      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then((res) => {
        this.userFullName = res.name;

        // retrieve the user's email from auth response
        const email = res.email;

        // store the email in browser storage
        this.storage.setItem('userEmail', JSON.stringify(email));
      });
    }
  }

  logout() {
    // terminates the session with Okta and removes current tokens
    this.oktaAuthService.signOut();

    localStorage.removeItem('okta-original-uri-storage');
    localStorage.removeItem('okta-cache-storage');
    localStorage.removeItem('okta-shared-transaction-storage');
    localStorage.removeItem('okta-token-storage');
  }
}
