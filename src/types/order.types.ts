export interface Order {
  id: string;
  customerName: string;
  email: string;
  address: string;
  mobileNumber: string;
  bagType: 'loop handle' | 'box bag';
  handleColor: string;
  size: string;
  jobName: string;
  bagColor: string;
  printColor: string;
  gsm: number;
  fabricQuality: string;
  quantity: number;
  agent: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export type OrderFormData = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;