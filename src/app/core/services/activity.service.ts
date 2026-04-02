import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Activity, DayPlan, CreateActivityDto, UpdateActivityDto } from '../models/activity.model';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDayPlan(tripId: string, dayNumber: number): Observable<ApiResponse<DayPlan>> {
    return this.http.get<ApiResponse<DayPlan>>(
      `${this.api}/trips/${tripId}/day-plans/${dayNumber}`,
    );
  }

  createActivity(tripId: string, dayPlanId: string, dto: CreateActivityDto): Observable<ApiResponse<Activity>> {
    return this.http.post<ApiResponse<Activity>>(
      `${this.api}/trips/${tripId}/day-plans/${dayPlanId}/activities`,
      dto,
    );
  }

  updateActivity(activityId: string, dto: UpdateActivityDto): Observable<ApiResponse<Activity>> {
    return this.http.put<ApiResponse<Activity>>(`${this.api}/activities/${activityId}`, dto);
  }

  deleteActivity(activityId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.api}/activities/${activityId}`);
  }

  reorderActivities(dayPlanId: string, orderedIds: string[]): Observable<ApiResponse<null>> {
    return this.http.patch<ApiResponse<null>>(
      `${this.api}/day-plans/${dayPlanId}/activities/reorder`,
      { ordered_ids: orderedIds },
    );
  }
}
