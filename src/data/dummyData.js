// Sales Orders
export const salesOrders = [
  {
    id: 'SO001',
    customerName: 'John Doe',
    jobName: 'HaldiRam',
    bagType: 'W-Cut',
    quantity: 1000,
    orderDate: '2024-02-20',
    status: 'Pending',
    totalAmount: 15000,
    specifications: {
      size: '12x15',
      color: 'Blue',
      material: 'Non-woven',
      gsm: '90'
    }
  },
  {
    id: 'SO002',
    customerName: 'Jane Smith',
    jobName: 'OmSweat',
    bagType: 'D-Cut',
    quantity: 2000,
    orderDate: '2024-02-19',
    status: 'Completed',
    totalAmount: 25000,
    specifications: {
      size: '10x12',
      color: 'Red',
      material: 'Non-woven',
      gsm: '100'
    }
  }
];

// Production Records
export const productionRecords = {
  wCut: {
    flexo: [
      {
        id: 'FP001',
        orderId: 'SO001',
        name: 'HaldiRam',
        stage: 'Printing',
        status: 'In Progress',
        startDate: '2024-02-20',
        completionDate: '2024-02-22',
        operator: 'Mike Johnson'
      }
    ],
    bagMaking: [
      {
        id: 'BM001',
        orderId: 'SO001',
        name: 'HaldiRam',
        stage: 'Cutting',
        status: 'Pending',
        startDate: '2024-02-22',
        completionDate: '2024-02-24',
        operator: 'Sarah Wilson'
      }
    ]
  },
  dCut: {
    opsert: [
      {
        id: 'OP001',
        orderId: 'SO002',
        name: 'HaldiRam',
        stage: 'Printing',
        status: 'Completed',
        startDate: '2024-02-19',
        completionDate: '2024-02-21',
        operator: 'David Brown'
      }
    ],
    bagMaking: [
      {
        id: 'BM002',
        orderId: 'SO002',
        name: 'HaldiRam',
        stage: 'Assembly',
        status: 'In Progress',
        startDate: '2024-02-21',
        completionDate: '2024-02-23',
        operator: 'Emily Davis'
      }
    ]
  }
};

// Delivery Records
export const deliveryRecords = [
  {
    id: 'DL001',
    orderId: 'SO001',
    customerName: 'John Doe',
    jobName: 'HaldiRam',
    status: 'In Transit',
    dispatchDate: '2024-02-22',
    expectedDelivery: '2024-02-24',
    address: '123 Main St, City',
    courier: 'Express Logistics'
  },
  {
    id: 'DL002',
    orderId: 'SO002',
    customerName: 'Jane Smith',
    jobName: 'OmSweat',
    status: 'Delivered',
    dispatchDate: '2024-02-21',
    deliveryDate: '2024-02-23',
    address: '456 Oak Ave, Town',
    courier: 'Swift Delivery'
  }
];