import { useMemo } from 'react';

export function useOrderMetrics(orders) {
  const metrics = useMemo(() => ({
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    completedOrders: orders.filter(order => order.status === 'completed').length,
    totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0)
  }), [orders]);

  return metrics;
}