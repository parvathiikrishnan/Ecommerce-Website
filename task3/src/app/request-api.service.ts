import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestAPIService {
  private apiurl = "https://fakestoreapi.com";
  constructor(private http: HttpClient) { }

  getCategories():Observable<any>{
    return this.http.get<any>(`${this.apiurl}/products/categories`);
  }

  getProducts(category):Observable<any>{
    return this.http.get<any>(`${this.apiurl}/products/category/${category}`);
  }

}
