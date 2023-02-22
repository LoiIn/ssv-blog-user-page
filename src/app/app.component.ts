import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-page';
  token?: String | null;

    constructor(private accountService: AuthService) {
        this.accountService.token.subscribe(x => this.token = x);
    }

    logout() {
        this.accountService.logout();
    }
}
