import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import SummaryCard from "../../components/dashboard/SummaryCard";
import DeliveryList from "../../components/delivery/RecentDelivery";
import deliveryService from "../../services/deliveryService";
import toast from "react-hot-toast";

export default function DeliveryDashboard() {
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    pending: 0,
    completed: 0,
  });

  const fetchDeliveryStats = async () => {
    try {
      const response = await deliveryService.getDeliveries();
      const orders = response.data; // Assuming the API returns the order list

      const totalDeliveries = orders.length;
      const pending = orders.filter(order => order.status === "pending").length;
      const completed = orders.filter(order => order.status === "delivered").length; // Adjust based on actual statuses

      setStats({ totalDeliveries, pending, completed });
    } catch (error) {
      toast.error("Failed to load delivery statistics");
    }
  };

  useEffect(() => {
    fetchDeliveryStats();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Total Deliveries"
          value={stats.totalDeliveries}
          increase="+10%"
          color="primary"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Pending"
          value={stats.pending}
          increase="+5%"
          color="warning"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          title="Completed"
          value={stats.completed}
          increase="+12%"
          color="success"
        />
      </Grid>
      <Grid item xs={12}>
        <DeliveryList />
      </Grid>
    </Grid>
  );
}
