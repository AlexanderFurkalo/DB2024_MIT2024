import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) {}

  goToCustomers(): void {
    this.router.navigate(['/customers']);
  }

  goToMaterials(): void {
    this.router.navigate(['/materials']);
  }

  goToManufacturers(): void {
    this.router.navigate(['/manufacturers']);
  }

  goToFurniture(): void {
    this.router.navigate(['/furniture']);
  }

  goToPurchases(): void {
    this.router.navigate(['/purchases']);
  }

  title = 'lab4angular-front';
  searchQuery: string = ''; 
  currentCollection: string = 'customers'

  onCollectionButtonClick(collection: string) {
    console.log(`Switched to collection: ${collection}`);
    this.currentCollection = collection;
  }

  onCrudButtonClick(operation: string) {
    console.log(`Performing ${operation} operation`);
  }

  onSearch() {
    // Logic for handling the search operation
    console.log('Searching...');
  }
}
