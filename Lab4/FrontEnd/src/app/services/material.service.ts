import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material.model';


@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseUrl = 'http://localhost:3000/api/material';

  constructor(private http: HttpClient) { }

  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.baseUrl);
  }

  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.baseUrl}/${id}`);
  }

  createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.baseUrl, material);
  }

  updateMaterial(id: string, material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.baseUrl}/${id}`, material);
  }

  deleteMaterial(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
