import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  private http = inject(HttpClient);
  private apiKey = 'aa9526a181ee447ea02104112260502';
  private baseUrl = 'http://api.weatherapi.com/v1/current.json';

  weatherData = signal<any>(null);

  getWeather(lat: number, lon: number) {
    const url = `${this.baseUrl}?key=${this.apiKey}&q=${lat},${lon}&aqi=no`;

    this.http.get(url).subscribe({
      next: (data) => this.weatherData.set(data),
      error: (err) => console.error('Error fetching weather:', err)
    });
  }
}
