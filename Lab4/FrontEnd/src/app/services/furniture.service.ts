import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Furniture } from '../models/furniture.model';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  private baseUrl = 'http://localhost:3000/api/furniture';

  constructor(private http: HttpClient) { }

  
  getAllFurniture(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(this.baseUrl);
  }

  getFurnitureById(id: string): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.baseUrl}/${id}`);
  }

  createFurniture(furniture: Furniture): Observable<Furniture> {
    return this.http.post<Furniture>(this.baseUrl, furniture);
  }

  updateFurniture(id: string, furniture: Furniture): Observable<Furniture> {
    return this.http.put<Furniture>(`${this.baseUrl}/${id}`, furniture);
  }

  deleteFurniture(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
