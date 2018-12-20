import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  constructor(private httpClient: HttpClient) {}

  get(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<HttpResponse<T>> {
    return this.httpClient.get<HttpResponse<T>>(url, { params, headers });
  }
  getAll(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<HttpResponse<T[]>> {
    return this.httpClient.get<HttpResponse<T[]>>(url, { params, headers });
  }
  post(
    url: string,
    obj: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<HttpResponse<T>> {
    return this.httpClient.post<HttpResponse<T>>(url, obj, { params, headers });
  }
  delete(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<HttpResponse<T>> {
    return this.httpClient.delete<HttpResponse<T>>(url, { params, headers });
  }
}
