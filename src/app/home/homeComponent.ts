import {Component, inject, signal} from '@angular/core';
import {HousingLocation} from '../models/housingLocation';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingService} from '../housingService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of housingLocationList(); track housingLocation.id) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrl: './homeComponent.css',
})
export class HomeComponent {


  private housingService = inject(HousingService);

  readonly housingLocationList = signal(this.housingService.getAllHousingLocations());
}
