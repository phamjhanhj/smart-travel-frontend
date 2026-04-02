import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginatedData } from '../models/api-response.model';
import { Trip, CreateTripDto, UpdateTripDto, TripStatus } from '../models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTrips(status?: TripStatus, page = 1, limit = 10): Observable<ApiResponse<PaginatedData<Trip>>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<PaginatedData<Trip>>>(`${this.api}/trips`, { params });
  }

  getTripById(id: string): Observable<ApiResponse<Trip>> {
    return this.http.get<ApiResponse<Trip>>(`${this.api}/trips/${id}`);
  }

  createTrip(dto: CreateTripDto): Observable<ApiResponse<Trip>> {
    return this.http.post<ApiResponse<Trip>>(`${this.api}/trips`, dto);
  }

  updateTrip(id: string, dto: UpdateTripDto): Observable<ApiResponse<Trip>> {
    return this.http.put<ApiResponse<Trip>>(`${this.api}/trips/${id}`, dto);
  }

  deleteTrip(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.api}/trips/${id}`);
  }
}
