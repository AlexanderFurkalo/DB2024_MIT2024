import { Component, OnInit } from '@angular/core';
import { Material } from '../models/material.model';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss', '../app.component.scss']
})
export class MaterialComponent implements OnInit{
  _id: string = '';
  material: any;
  materials: Material[] = [];
  newMaterial: Material = { _id: '', name: '' };
  selectedMaterial: any;
  operation: string = 'get';
  updatedName: string = '';
  updatedMaterialName: string = '';
  materialId: string = '';

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.getAllMaterials();
  }

  performOperation(operation: string): void {
    this.operation = operation;
    switch (operation) {
      case 'create':
        break;
      case 'get':
        this.getMaterialById();
        break;
      case 'update':
        break;
      case 'delete':
        break;
    }
  }

  getAllMaterials(): void {
    this.materialService.getAllMaterials()
      .subscribe(materials => {
        this.materials = materials;
      }, error => {
        console.error('Error fetching materials:', error);
      });
  }

  getMaterialById(): void {
    this.materialService.getMaterialById(this._id)
      .subscribe(
        material => {
        this.selectedMaterial = material;
      }, error => {
        console.error('Error fetching material by ID:', error);
      });
  }

  createMaterial(): void {
    this.materialService.createMaterial(this.newMaterial as Material)
      .subscribe(
        () => {
          console.log('Material created successfully');
          this.newMaterial = { _id: '', name: '' };
        },
        error => {
          console.error('Error creating material:', error);
        }
      );
  }

  findMaterial() {
    this.materialService.getMaterialById(this.materialId).subscribe(
      (material) => {
        this.selectedMaterial = material;
        this.updatedName = material.name;
      },
      (error) => {
        console.error('Error fetching material:', error);
      }
    );
  }

  updateMaterial() {
    const updatedMaterial = {
      _id: this.selectedMaterial._id,
      name: this.updatedMaterialName,
    };

    this.materialService.updateMaterial(this.selectedMaterial?._id, updatedMaterial).subscribe(
      (response) => {
        console.log('Material updated successfully:', response);
      },
      (error) => {
        console.error('Error updating material:', error);
      }
    );
  }

  deleteMaterial(): void {
    this.materialService.deleteMaterial(this.materialId)
      .subscribe(
        () => {
          console.log('Material deleted successfully');
        },
        error => {
          console.error('Error deleting material:', error);
        }
      );
  }
}
