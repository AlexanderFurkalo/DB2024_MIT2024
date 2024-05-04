import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss', '../app.component.scss']
})

export class CustomerComponent implements OnInit{
  _id: string = '';
  operation: string = 'get';
  customers: Customer[] = [];
  customer: any;
  newCustomer: any = {};
  customerId: string = '';
  searchQuery: string = '';
  updatedFirstName: string = '';
  updatedLastName: string = '';
  updatedEmail: string = '';
  selectedCustomer: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }

  performOperation(operation: string): void {
    this.operation = operation;
    switch (operation) {
      case 'create':
        break;
      case 'get':
        this.getCustomerById();
        break;
      case 'update':
        break;
      case 'delete':
        break;
    }
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers()
      .subscribe(customers => {
        this.customers = customers;
      }, error => {
        console.error('Error fetching customers:', error);
      });
  }

  getCustomerById(): void {
    this.customerService.getCustomerById(this._id)
      .subscribe(customer => {
          this.customer = customer;
        }, error => {
          console.error('Error fetching customer by ID:', error);
        });
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.newCustomer)
      .subscribe(
        () => {
          console.log('Customer created successfully');
          this.newCustomer = {}; 
        },
        error => {
          console.error('Error creating customer:', error);
        }
      );
  }

  findCustomer() {
    this.customerService.getCustomerById(this.customerId).subscribe(
      (customer) => {
        this.selectedCustomer = customer;
        this.updatedFirstName = customer.first_name;
        this.updatedLastName = customer.last_name;
        this.updatedEmail = customer.email;
      },
      (error) => {
        console.error('Error fetching customer:', error);
      }
    );
  }

  updateCustomer() {
    const updatedCustomer = {
      _id: this.selectedCustomer._id,
      first_name: this.updatedFirstName,
      last_name: this.updatedLastName,
      email: this.updatedEmail,
    };

    this.customerService.updateCustomer(this.selectedCustomer._id, updatedCustomer).subscribe(
      (response) => {
        console.log('Customer updated successfully:', response);
      },
      (error) => {
        console.error('Error updating customer:', error);
      }  
    );
  }
  

  deleteCustomer(): void {
    this.customerService.deleteCustomer(this.customerId)
      .subscribe(
        () => {
          console.log('Customer deleted successfully');
        },
        error => {
          console.error('Error deleting customer:', error);
        }
      );
  }
}
