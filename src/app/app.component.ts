import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {EvernoteListComponent} from "./evernote-list/evernote-list.component";
import {Catalogue} from "./shared/catalogue";
import {CatalogueDetailsComponent} from "./catalogue-details/catalogue-details.component";
import {HomeComponent} from "./home/home.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EvernoteListComponent, CatalogueDetailsComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    return this.isLoggedIn() ? "Logout" : "Login";
  }

}
