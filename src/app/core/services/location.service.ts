import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Location, SearchLocationsParams } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchLocations(params: SearchLocationsParams): Observable<ApiResponse<Location[]>> {
    let httpParams = new HttpParams();
    if (params.keyword) httpParams = httpParams.set('keyword', params.keyword);
    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.lat) httpParams = httpParams.set('lat', params.lat);
    if (params.lng) httpParams = httpParams.set('lng', params.lng);
    if (params.radius) httpParams = httpParams.set('radius', params.radius);
    return this.http.get<ApiResponse<Location[]>>(`${this.api}/locations/search`, { params: httpParams });
  }

  getLocationById(id: string): Observable<ApiResponse<Location>> {
    return this.http.get<ApiResponse<Location>>(`${this.api}/locations/${id}`);
  }
}
