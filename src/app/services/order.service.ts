import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = environment.baseUrl;
  userData: any;
  plans: any[] = [];

  constructor(private http: HttpClient) {}

  // Get Order
  getOrder() {
    return this.http.get(this.baseUrl + 'orders', this.getHttpOptions());
  }

  // Add Order
  addOrder(data: any) {
    return this.http.post(this.baseUrl + 'orders', data, this.getHttpOptions());
  }


  // Get Plans
  getPlans() {
    return this.plans
  }

  // Save cart
  saveCart() {
    localStorage.setItem('cart_item', JSON.stringify(this.plans))
  }

  // Add to cart
  addToCart(plan: any) {
    this.loadCart()

    this.plans.push(plan)
    
    this.saveCart()
  }

  // Load Cart
  loadCart() {
    this.plans = JSON.parse(localStorage.getItem('cart_item') as any) || [];
    return this.plans
  }

  // Plan in Cart
  planInCart(plan: any): boolean {
    return this.plans.findIndex((x: any) => x.id === plan.id) > -1;
  }

  // Remove plan
  removePlan(plan: any) {
    const index = this.plans.findIndex((x: any) => x.id === plan.id);
    
    if (index > -1) {
      this.plans.splice(index, 1);
      this.saveCart();
    }
  }
  
  // Clear cart
  clearPlans() {
    localStorage.clear();
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }
}
