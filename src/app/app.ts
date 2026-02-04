import {Component, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HomeComponent} from './home/homeComponent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, RouterLink,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ANGULAR-HOUSING');
}
