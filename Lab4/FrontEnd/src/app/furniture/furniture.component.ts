import { Component, OnInit } from '@angular/core';
import { Furniture } from '../models/furniture.model';
import { FurnitureService } from '../services/furniture.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss', '../app.component.scss']
})
export class FurnitureComponent implements OnInit{
  furniture: Furniture[] = [];
  operation: string = 'get';
  selectedFurniture: Furniture | null = null;
  newFurniture: Partial<Furniture> = {};
  updatedFurniture: Partial<Furniture> = {};
  furnitureId: string = '';
  _id: string = '';
  updatedName: string = '';
  updatedType: string = '';
  updatedMaterialId: string = '';
  updatedManufacturerId: string = '';
  updatedDescription: string = '';
  updatedPrice: number = 0;

  constructor(private furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.getAllFurniture();
  }

  performOperation(operation: string): void {
    this.operation = operation;
    switch (operation) {
      case 'create':
        break;
      case 'get':
        this.getFurnitureById();
        break;
      case 'update':
        break;
      case 'delete':
        break;
    }
  }

  getAllFurniture(): void {
    this.furnitureService.getAllFurniture()
      .subscribe(furniture => {
        this.furniture = furniture;
      }, error => {
        console.error('Error fetching furniture:', error);
      });
  }

  getFurnitureById(): void {
    this.furnitureService.getFurnitureById(this._id)
      .subscribe(
        furniture => {
          this.selectedFurniture = furniture;
        },
        error => {
          console.error('Error fetching furniture by ID:', error);
        }
      );
  }

  createFurniture(): void {
    this.furnitureService.createFurniture(this.newFurniture as Furniture)
      .subscribe(
        () => {
          console.log('Furniture created successfully');
          this.newFurniture = {}; 
        },
        error => {
          console.error('Error creating furniture:', error);
        }
      );
  }

  findFurniture() {
    this.furnitureService.getFurnitureById(this.furnitureId).subscribe(
      furniture => {
        this.selectedFurniture = furniture;
        this.updatedName = furniture.name;
        this.updatedType = furniture.type;
        this.updatedMaterialId = furniture.material_id;
        this.updatedManufacturerId = furniture.manufacturer_id;
        this.updatedPrice = furniture.price;
        this.updatedDescription = furniture.description;
      },
      error => {
        console.error('Error fetching furniture:', error);
      }
    );
  }
  
  updateFurniture(): void {
  
    const updatedFurniture: Partial<Furniture> = {
      _id: this.selectedFurniture?._id, 
      name: this.updatedName,
      type: this.updatedType,
      material_id: this.updatedMaterialId,
      manufacturer_id: this.updatedManufacturerId,
      price: this.updatedPrice,
      description: this.updatedDescription
    };
  
    this.furnitureService.updateFurniture(this.selectedFurniture?._id || '', updatedFurniture as Furniture).subscribe(
      () => {
        console.log('Furniture updated successfully');
        this.selectedFurniture = null;
      },
      error => {
        console.error('Error updating furniture:', error);
      }  
    );
  }

  deleteFurniture(): void {
    this.furnitureService.deleteFurniture(this.furnitureId)
      .subscribe(
        () => {
          console.log('Furniture deleted successfully'); 
        },
        error => {
          console.error('Error deleting furniture:', error);
        }
      );
  }
}
