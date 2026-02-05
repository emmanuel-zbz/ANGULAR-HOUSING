import {Component, input} from '@angular/core';
import {HousingLocation} from '../models/housingLocation';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [ngSrc]="housingLocation().photo" width="400" height="500"
           alt="Exterior photo of {{housingLocation().name}}"/>
      <h2 class="listing-heading">{{ housingLocation().name }}</h2>
      <p class="listing-location">{{ housingLocation().city }},
        {{ housingLocation().state }}
      </p>
      <a [routerLink]="['/details', housingLocation().id]">Learn More</a>
    </section>
  `,
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {

  housingLocation = input.required<HousingLocation>();

}
