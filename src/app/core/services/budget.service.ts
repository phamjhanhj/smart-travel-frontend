import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { BudgetItem, BudgetSummary, CreateBudgetItemDto, UpdateBudgetItemDto } from '../models/budget.model';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBudgetSummary(tripId: string): Observable<ApiResponse<BudgetSummary>> {
    return this.http.get<ApiResponse<BudgetSummary>>(`${this.api}/trips/${tripId}/budget`);
  }

  getBudgetItems(tripId: string): Observable<ApiResponse<BudgetItem[]>> {
    return this.http.get<ApiResponse<BudgetItem[]>>(`${this.api}/trips/${tripId}/budget/items`);
  }

  addBudgetItem(tripId: string, dto: CreateBudgetItemDto): Observable<ApiResponse<BudgetItem>> {
    return this.http.post<ApiResponse<BudgetItem>>(`${this.api}/trips/${tripId}/budget/items`, dto);
  }

  updateBudgetItem(itemId: string, dto: UpdateBudgetItemDto): Observable<ApiResponse<BudgetItem>> {
    return this.http.put<ApiResponse<BudgetItem>>(`${this.api}/budget/items/${itemId}`, dto);
  }

  deleteBudgetItem(itemId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.api}/budget/items/${itemId}`);
  }
}
