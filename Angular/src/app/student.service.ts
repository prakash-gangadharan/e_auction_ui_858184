import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private baseUrl = 'http://localhost:8083/e-auction/api/v1';
  private getProduct = 'http://localhost:8083/e-auction/api/v1/seller';
  private getProductListUrl = 'http://localhost:8083/e-auction/api/v1/seller/products'

  constructor(private http:HttpClient) { }

  getProductList(): Observable<any> {
    return this.http.get(`${this.getProductListUrl}`+'');
  }

  getProductDetails(): Observable<any> {
    return this.http.get(`${this.getProduct}`+'/show-bids/03d8c30e-753c-43c3-9349-db9eae8279fc');
  }

  showBids(id: string): Observable<any> {
  console.log("showBids id: " + id);
    return this.http.get(`${this.getProduct}/show-bids/${id}`);
  }

  createStudent(student: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-student', student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-student/${id}`, { responseType: 'text' });
  }

  getStudent(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/student/${id}`);
  }

  updateStudent(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-student/${id}`, value);
  }
  
}                                           
