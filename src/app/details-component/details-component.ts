import {Component, computed, effect, inject, input, numberAttribute, signal,} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {HousingService} from '../housingService';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {HousingLocation} from '../models/housingLocation';
import {Weather} from '../weather';
import {DetailsComponentForm} from '../details-component-form/details-component-form';

@Component({
  selector: 'app-details-component',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    DetailsComponentForm
  ],
  template: `
    <article>
      @if (housingLocation(); as location) {
        <img class="listing-photo" [ngSrc]="location.photo"
             alt="Exterior photo of {{location.name}}" width="400" height="400"/>
        <section class="listing-description">
          <h2 class="listing-heading">{{ location.name }}</h2>
          <p class="listing-location">{{ location.city }}, {{ location.state }}</p>
        </section>
        <section class="listing-features">
          <h2 class="section-heading">About this housing location</h2>
          <ul>
            <li>Units available: {{ location.availableUnits }}</li>
            <li>Price: {{ location.price }} €</li>
            <li>Is Available: {{ location.available ? 'Yes' : 'No' }}</li>
            <li>Coordinates: {{ location.coordinate.latitude }}, {{ location.coordinate.longitude }}</li>

            <li>Does this location have wifi: {{ location.wifi ? 'Yes' : 'No' }}</li>
            <li>Does this location have laundry: {{ location.laundry ? 'Yes' : 'No' }}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">Apply now to live here</h2>
          <app-details-component-form></app-details-component-form>
        </section>
      }

    </article>
  `,
  styleUrl: './details-component.css',
})
export class DetailsComponent {

  private housingService = inject(HousingService);
  weatherService = inject(Weather);


  readonly id = input.required<string>();

  housingLocation = signal<HousingLocation | undefined>(undefined);

  constructor() {

    effect(() => {
      const idActual = this.id();
      // Llamamos al servicio y cuando responda (.subscribe), actualizamos la señal.
      this.housingService.getHousingLocationById(idActual).subscribe(datos => {
        this.housingLocation.set(datos);
        if (datos.coordinate) {
          this.weatherService.getWeather(
            datos.coordinate.latitude,
            datos.coordinate.longitude
          );
        }
      });


    });


  }


}
