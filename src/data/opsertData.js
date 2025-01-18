export const opsertOrders = [
  {
    id: 'OPS-001',
    order_id: 'PO-001',
    job_name: 'Job A',
    bag_type: 'D-Cut',
    bag_color: 'Blue',
    print_type: 'Single Side',
    print_color: 'Black',
    bag_size: '12x15x4',
    quantity: 1000,
    remarks: 'Urgent Order',
    status: 'pending'
  },
  {
    id: 'OPS-002',
    order_id: 'PO-002',
    job_name: 'Job B',
    bag_type: 'D-Cut',
    bag_color: 'Red',
    print_type: 'Both Sides',
    print_color: 'White',
    bag_size: '10x12x3',
    quantity: 2000,
    remarks: 'Priority',
    status: 'in_progress'
  },
  // Add completed orders
  {
    id: 'OPS-003',
    order_id: 'PO-003',
    job_name: 'Job C',
    bag_type: 'D-Cut',
    bag_color: 'Green',
    print_type: 'Both Sides',
    print_color: 'Gold',
    bag_size: '15x20x5',
    quantity: 3000,
    remarks: 'No Special Remarks',
    status: 'completed',
    completion_date: '2024-02-20'
  },
  {
    id: 'OPS-004',
    order_id: 'PO-004',
    job_name: 'Job D',
    bag_type: 'D-Cut',
    bag_color: 'Black',
    print_type: 'Single Side',
    print_color: 'Silver',
    bag_size: '8x10x3',
    quantity: 1500,
    remarks: 'Important Client',
    status: 'completed',
    completion_date: '2024-02-19'
  },
  {
    id: 'OPS-005',
    order_id: 'PO-005',
    job_name: 'Job E',
    bag_type: 'D-Cut',
    bag_color: 'Purple',
    print_type: 'Both Sides',
    print_color: 'White',
    bag_size: '20x25x6',
    quantity: 2500,
    remarks: 'Custom Order',
    status: 'completed',
    completion_date: '2024-02-18'
  }
];
