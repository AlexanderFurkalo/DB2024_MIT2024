import { Component, OnInit } from '@angular/core';
import { Purchase } from '../models/purchase.model';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss', '../app.component.scss']
})
export class PurchaseComponent implements OnInit{
  _id: string = '';
  operation: string = 'get';
  purchase: any;
  purchases: Purchase[] = [];
  selectedPurchase: Purchase | null = null;
  newPurchase: Partial<Purchase> = {};
  customerId: string = '';
  furnitureId: string = '';
  purchaseId: string = '';
  updatedCustomerId: string | undefined;
  updatedFurnitureId: string | undefined;
  updatedPurchaseDate: Date | undefined;
  updatedQuantity: number | undefined;
  updatedTotalPrice: number | undefined;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.getAllPurchases();
  }

  performOperation(operation: string): void {
    this.operation = operation;
    switch (operation) {
      case 'create':
        break;
      case 'get':
        this.getPurchaseById();
        break;
      case 'update':
        break;
      case 'delete':
        break;
    }
  }

  getAllPurchases(): void {
    this.purchaseService.getAllPurchases()
      .subscribe(purchases => {
        this.purchases = purchases;
      }, error => {
        console.error('Error fetching purchases:', error);
      });
  }

  getPurchaseById(): void {
    this.purchaseService.getPurchaseById(this._id)
      .subscribe(
        purchase => {
          this.selectedPurchase = purchase;
        },
        error => {
          console.error('Error fetching purchase by ID:', error);
        }
      );
  }

  createPurchase(): void {
    this.purchaseService.createPurchase(this.newPurchase as Purchase)
      .subscribe(
        () => {
          console.log('Purchase created successfully');
          this.newPurchase = {}; 
        },
        error => {
          console.error('Error creating purchase:', error);
        }
      );
  }

  findPurchase() {
    if (!this.purchaseId) {
      console.error('No purchase ID provided.');
      return;
    }
  
    this.purchaseService.getPurchaseById(this.purchaseId)
      .subscribe(
        (purchase) => {
          this.selectedPurchase = purchase;
          this.updatedCustomerId = purchase.customer_id;
          this.updatedFurnitureId = purchase.furniture_id;
          this.updatedPurchaseDate = purchase.purchase_date;
          this.updatedQuantity = purchase.quantity;
          this.updatedTotalPrice = purchase.total_price;
        },
        (error) => {
          console.error('Error fetching purchase:', error);
        }
      );
  }

  updatePurchase() {
    if (!this.selectedPurchase) {
      console.error('No purchase selected for update.');
      return;
    }
  
    const updatedPurchase: Partial<Purchase> = {
      _id: this.selectedPurchase._id,
      customer_id: this.updatedCustomerId,
      furniture_id: this.updatedFurnitureId,
      purchase_date: this.updatedPurchaseDate,
      quantity: this.updatedQuantity,
      total_price: this.updatedTotalPrice,
    };
  
    this.purchaseService.updatePurchase(this.selectedPurchase._id, updatedPurchase as Purchase)
      .subscribe(
        () => {
          console.log('Purchase updated successfully');
          this.selectedPurchase = null;
        },
        (error) => {
          console.error('Error updating purchase:', error);
        }
      );
  }
  

  deletePurchase(): void {
    this.purchaseService.deletePurchase(this.purchaseId)
      .subscribe(
        () => {
          console.log('Purchase deleted successfully');
        },
        error => {
          console.error('Error deleting purchase:', error);
        }
      );
  }
}
