// Utility for consistent status color mapping across components
export const getStatusColor = (status) => {
  const colors = {
    pending: 'warning',
    in_progress: 'info',
    completed: 'success',
    cancelled: 'error',
  };
  return colors[status] || 'default';
};