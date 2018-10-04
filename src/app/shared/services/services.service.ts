import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SERVICING_DOMAIN } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getServiceCategories()
  {
    return this.http.get(`${SERVICING_DOMAIN}/api/dproz/services/categories`);
  }

  getServicesByCategory(category_id)
  {
    return this.http.get(`${SERVICING_DOMAIN}/api/dproz/services/categories`);
  }

}
