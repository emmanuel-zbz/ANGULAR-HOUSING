import {inject, Injectable,} from '@angular/core';
import {HousingLocation} from './models/housingLocation';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {

  private readonly url = 'http://localhost:3000/locations';
  private http = inject(HttpClient);

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url);
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Application received: ${firstName}, ${lastName}, ${email}.`);
  }
}
