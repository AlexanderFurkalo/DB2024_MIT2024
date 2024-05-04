export interface Purchase {
    _id: string; 
    customer_id: string; 
    furniture_id: string; 
    purchase_date: Date;
    quantity: number;
    total_price: number;
  }