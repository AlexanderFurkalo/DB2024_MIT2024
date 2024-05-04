import { Component, OnInit } from '@angular/core';
import { Manufacturer } from '../models/manufacturer.model';
import { ManufacturerService } from '../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss', '../app.component.scss']
})
export class ManufacturerComponent implements OnInit{
  manufacturers: Manufacturer[] = [];
  manufacturer: Manufacturer | undefined;
  newManufacturer: Partial<Manufacturer> = {};
  manufacturerId: string = '';
  selectedManufacturer: Manufacturer | undefined;
  updatedName: string = '';
  updatedLocation: string = '';
  operation: string = 'get';
  updateManufacturerId: string = '';
  updatedManufacturerName: string = '';
  updatedManufacturerLocation: string = '';

  constructor(private manufacturerService: ManufacturerService) {}

  ngOnInit(): void {
    this.getAllManufacturers();
  }

  performOperation(operation: string): void {
    this.operation = operation;
    switch (operation) {
      case 'create':
        break;
      case 'get':
        this.getManufacturerById();
        break;
      case 'update':
        break;
      case 'delete':
        break;
    }
  }

  getAllManufacturers(): void {
    this.manufacturerService.getAllManufacturers()
      .subscribe(manufacturers => {
        this.manufacturers = manufacturers;
      }, error => {
        console.error('Error fetching manufacturers:', error);
      });
  }

  getManufacturerById(): void {
    this.manufacturerService.getManufacturerById(this.manufacturerId)
      .subscribe(manufacturer => {
          this.manufacturer = manufacturer;
        }, error => {
          console.error('Error fetching manufacturer by ID:', error);
        });
  }

  createManufacturer(): void {
    this.manufacturerService.createManufacturer(this.newManufacturer as Manufacturer)
      .subscribe(
        () => {
          console.log('Manufacturer created successfully');
          this.newManufacturer = {}; 
        },
        error => {
          console.error('Error creating manufacturer:', error);
        }
      );
  }

  findManufacturer() {
    this.manufacturerService.getManufacturerById(this.manufacturerId).subscribe(
      (manufacturer) => {
        this.selectedManufacturer = manufacturer;
        this.updatedName = manufacturer.name;
        this.updatedLocation = manufacturer.location;
      },
      (error) => {
        console.error('Error fetching manufacturer:', error);
      }
    );
  }

  updateManufacturer() {
    const updatedManufacturer: Partial<Manufacturer> = {
      _id: this.selectedManufacturer?._id,
      name: this.updatedName,
      location: this.updatedLocation,
    };

    this.manufacturerService.updateManufacturer(this.selectedManufacturer?._id || '', updatedManufacturer as Manufacturer).subscribe(
      (response) => {
        console.log('Manufacturer updated successfully:', response);
      },
      (error) => {
        console.error('Error updating manufacturer:', error);
      }  
    );
  }

  deleteManufacturer(): void {
    this.manufacturerService.deleteManufacturer(this.manufacturerId)
      .subscribe(
        () => {
          console.log('Manufacturer deleted successfully');
        },
        error => {
          console.error('Error deleting manufacturer:', error);
        }
      );
  }
}
