import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HousingService} from '../housingService';

@Component({
  selector: 'app-details-component-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  template: `

    <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" formControlName="firstName">

      <label for="last-name">Last Name</label>
      <input id="last-name" type="text" formControlName="lastName">

      <label for="last-name">Phone Number</label>
      <input id="last-name" type="number" formControlName="phoneNumber">

      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email">

      <label for="last-name">Visiting date</label>
      <input id="last-name" type="date" formControlName="desiredDate">

      <label for="last-name">Message</label>
      <textarea id="message" formControlName="message"></textarea>

      <label for="email">Policies</label>
      <p>Accept</p>
      <input type="checkbox" name="policies" formControlName="policies">

      <button type="submit" class="primary" [disabled]=[!applyForm.valid]>Apply now</button>
    </form>
  `,
  styleUrl: './details-component-form.css',
})
export class DetailsComponentForm {

  private formBuilder = inject(FormBuilder);
  private housingService = inject(HousingService);

  applyForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    desiredDate: ['', Validators.required],
    message: [''],
    policies: [['', Validators.required]]
  })

  submitApplication() {

    if (this.applyForm.valid) {
      const userData = this.applyForm.getRawValue();


      localStorage.setItem('userContact', JSON.stringify(userData));

      this.housingService.submitApplication(
        userData.firstName,
        userData.lastName,
        userData.email
      );
      alert('Application submitted and saved locally!');
    }

  }


}
