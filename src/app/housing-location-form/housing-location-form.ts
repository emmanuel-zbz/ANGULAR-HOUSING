import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HousingService} from '../housingService';
import {HousingLocation} from '../models/housingLocation';

@Component({
  selector: 'app-housing-location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './housing-location-form.html',
  styleUrl: './housing-location-form.css',
})
export class HousingLocationForm {

  private fb = inject(FormBuilder);
  private housingService = inject(HousingService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', Validators.required],
    state: ['', Validators.required],
    availableUnits: [1, [Validators.required, Validators.min(1)]],
    price: [10000, [Validators.required, Validators.min(10000)]],
    wifi: [false],
    laundry: [false],
    available: [true]
  });

  isSubmitting = signal(false);

  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);

    const rawData = this.form.getRawValue();

    const newHouse: Omit<HousingLocation, 'id'> = {
      ...rawData,
      photo: '',
      coordinate: {latitude: 0, longitude: 0}
    };


    this.housingService.addHousingLocation(newHouse).subscribe({
      next: () => {
        alert('House created successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Error creating house.');
        this.isSubmitting.set(false); // Desactivamos carga si falla
      }
    });
  }
}
