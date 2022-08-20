import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = environment.baseUrl;
  userData: any;

  constructor(private http: HttpClient) {}

  // Get Order
  getOrder() {
    return this.http.get(this.baseUrl + 'orders', this.getHttpOptions());
  }

  // Add Order
  addOrder(data: any) {
    return this.http.post(this.baseUrl + 'orders', data, this.getHttpOptions());
  }

  // Get Order to localstorage
  getOrderFromLocalStorage() {
    this.userData = localStorage.getItem('cart');
    let data = JSON.parse(this.userData);
    return data;
  }

  // Add Order to localstorage
  addOrderToLocalStorage(data: any): void {
    let allData = JSON.parse(localStorage.getItem('cart') || '[]');
    let exist = allData.some((obj: any) => obj.user_id === data.user_id);
    if (!exist) {
      allData.push(data);
      return localStorage.setItem('cart', JSON.stringify(allData));
    }
  }
  // Add Order to localstorage
  removeOrderToLocalStorage(index: any): void {
    console.log(index);
    let allData = JSON.parse(localStorage.getItem('cart') || '[]');
    // if (!exist) {
    allData.splice(index, 1);
    return localStorage.setItem('cart', JSON.stringify(allData));
    // }
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
