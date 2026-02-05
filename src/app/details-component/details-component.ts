import {Component, computed, effect, inject, input, numberAttribute, signal,} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {HousingService} from '../housingService';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {HousingLocation} from '../models/housingLocation';

@Component({
  selector: 'app-details-component',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule
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
            <li>Does this location have wifi: {{ location.wifi }}</li>
            <li>Does this location have laundry: {{ location.laundry }}</li>
          </ul>
        </section>
        <section class="listing-apply">
          <h2 class="section-heading">Apply now to live here</h2>
          <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
            <label for="first-name">First Name</label>
            <input id="first-name" type="text" formControlName="firstName">

            <label for="last-name">Last Name</label>
            <input id="last-name" type="text" formControlName="lastName">

            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email">
            <button type="submit" class="primary">Apply now</button>
          </form>
        </section>
      }

    </article>
  `,
  styleUrl: './details-component.css',
})
export class DetailsComponent {

  private housingService = inject(HousingService);
  private formBuilder = inject(FormBuilder);


  readonly id = input.required<number, string>({transform: numberAttribute});

  housingLocation = signal<HousingLocation | undefined>(undefined);

  constructor() {
    // 2. CAMBIO: Usamos effect()
    // Esto se lee: "Vigila las señales. Cuando 'id()' cambie, ejecuta esto".
    effect(() => {
      const idActual = this.id();
      // Llamamos al servicio y cuando responda (.subscribe), actualizamos la señal.
      this.housingService.getHousingLocationById(idActual).subscribe(datos => {
        this.housingLocation.set(datos);
      });
    });
  }


  applyForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]]
  })

  submitApplication() {

    //COGEMOS LOS DATOS DEL FROMULARIO CON LA DESESTRUCTURACION DE OBJETOS
    //getRawValue() nos da un objeto con pares de clave-valor
    const {firstName, lastName, email} = this.applyForm.getRawValue();
    this.housingService.submitApplication(firstName, lastName, email);

  }


}
