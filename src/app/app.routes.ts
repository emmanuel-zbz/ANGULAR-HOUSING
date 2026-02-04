import {Routes} from '@angular/router';
import {HomeComponent} from './home/homeComponent';
import {DetailsComponent} from './details-component/details-component';

export const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home page'},
  {path: 'details/:id', component: DetailsComponent, title: 'Home details'},
];
