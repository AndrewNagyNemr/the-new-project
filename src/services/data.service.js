import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BadInput, NotFound, AppError } from '../common';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private url, private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }

  getOne(id) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(resource) {
    return this.http
      .post(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  edit(id, resource) {
    return this.http
      .put(`${this.url}/${id}`, resource)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: Response) {
    if (err.status === 404) return throwError(new NotFound(err));
    if (err.status === 400) return throwError(new BadInput(err));
    return throwError(new AppError(err));
  }
}
