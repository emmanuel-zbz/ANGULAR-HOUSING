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
        <button class="primary" type="button"
                (click)="filterResults(filter.value, Boolean(filterBox.value), orden.value)">Search
        </button>

        <div>
          <div>
            <label for="filter">Disponibilidad: </label>
            <input type="checkbox" id="checkboxFilter" placeholder="Filter by state" #filterBox>
          </div>
          <div>
            <label for="filter">Ordenar por precio: </label>
            <select id="filter" #orden>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>

        </div>


      </form>
    </section>
    <section class="results">
      @if (filteredLocationList().length > 1) {
        @for (housingLocation of filteredLocationList(); track housingLocation.id) {
          <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
        }
      } @else {
        <h2>No se han encontrado coincidencias</h2>
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

  readonly filterQueryText = signal<string>('');

  readonly filterQueryBoolean = signal(false);

  readonly filterQuerySelect = signal<string>('');


  readonly filteredLocationList = computed(() => {
    const list = this.housingLocationList().sort((a, b) => a.price - b.price);

    const orden = this.filterQuerySelect();




    const checkboxFilter = this.filterQueryBoolean();

    if (checkboxFilter) {
      return list.filter(item => item.available);
    }



    const text = this.filterQueryText().toLowerCase();


    return list.filter(item =>
      item.city.toLowerCase().includes(text)
    ).sort((a, b) => b.price - a.price);
  });

  filterResults(filtro: string, filterBox: boolean, filterSelect: string) {
    this.filterQueryText.set(filtro);
    this.filterQueryBoolean.set(filterBox);
    this.filterQuerySelect.set(filterSelect);
  }

  protected readonly Boolean = Boolean;
}
