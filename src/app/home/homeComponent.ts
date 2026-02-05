import {Component, computed, inject, signal} from '@angular/core';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingService} from '../housingService';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredLocationList(); track housingLocation.id) {
        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
      }
    </section>
  `,
  styleUrl: './homeComponent.css',
})
export class HomeComponent {

  private housingService = inject(HousingService);


  readonly housingLocationList = toSignal(
    this.housingService.getAllHousingLocations(),
    {initialValue: []}
  );

  readonly filterQuery = signal<string>('');

  readonly filteredLocationList = computed(() => {
    const list = this.housingLocationList();
    const text = this.filterQuery().toLowerCase();

    if (!text) {
      return list;
    }

    return list.filter(item =>
      item.city.toLowerCase().includes(text)
    );
  });

  filterResults(filtro: string) {
    this.filterQuery.set(filtro);
  }
}
