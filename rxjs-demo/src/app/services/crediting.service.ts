import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Credit } from '../interfaces/credit';
import { PricingPlan } from '../interfaces/pricing-plan';
import { ReceiveMethod } from '../interfaces/receive-method';

@Injectable({
  providedIn: 'root',
})
export class CreditingService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerNewCredit(creditData: Credit) {
    return this.http.post(`${this.baseUrl}/credits`, creditData);
  }

  getReceiveMethodsList(): Observable<ReceiveMethod[]> {
    return this.http.get<ReceiveMethod[]>(`${this.baseUrl}/receive-methods`);
  }

  getPricingPlansList(): Observable<PricingPlan[]> {
    return this.http.get<PricingPlan[]>(`${this.baseUrl}/pricing-plans`);
  }
}
