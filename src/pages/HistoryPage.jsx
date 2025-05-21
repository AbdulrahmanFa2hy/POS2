import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, parse, isWithinInterval } from "date-fns";
import { fetchAllPayments } from "../store/paymentSlice";
import HistoryHeader from "../components/history/HistoryHeader";
import Table from "../components/history/Table";

function HistoryPage() {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.payment);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    dispatch(fetchAllPayments());
  }, [dispatch]);

  // Transform payment API data to OrdersTable format
  const transformPayment = (payment) => {
    const orderData = payment.orderData || {};
    const createdAt = payment.createdAt || orderData.createdAt;
    const dateObj = createdAt ? new Date(createdAt) : null;

    return {
      orderId: orderData.orderCode || "-",
      date: dateObj ? format(dateObj, "d MMM, yyyy") : "-",
      time: dateObj ? format(dateObj, "h:mm a") : "-",
      table: orderData.tableNumber ? `T${orderData.tableNumber}` : "-",
      amount: payment.totalAmount ? `${payment.totalAmount} AED` : "-",
      paymentMethod:
        payment.paymentMethods?.length > 0
          ? payment.paymentMethods
              .map((pm) => pm.method.toUpperCase())
              .join(" & ")
          : "-",
      rawDate: dateObj, // Keep the raw date for filtering
    };
  };

  // Filter and transform payments based on search term and date range
  const filteredOrders = useMemo(() => {
    return payments
      .map(transformPayment)
      .filter((order) => {
        // Filter by search term
        const matchesSearch =
          searchTerm === "" ||
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by date range
        let matchesDate = true;
        if (dateRange && order.rawDate) {
          if (dateRange.includes(" - ")) {
            // Date range filter
            const [startStr, endStr] = dateRange.split(" - ");
            const startDate = parse(startStr, "d MMM, yyyy", new Date());
            const endDate = parse(endStr, "d MMM, yyyy", new Date());
            matchesDate = isWithinInterval(order.rawDate, {
              start: startDate,
              end: endDate,
            });
          } else {
            // Single date filter
            const selectedDate = parse(dateRange, "d MMM, yyyy", new Date());
            matchesDate =
              format(order.rawDate, "d MMM, yyyy") ===
              format(selectedDate, "d MMM, yyyy");
          }
        }

        return matchesSearch && matchesDate;
      })
      .map(({ ...order }) => order);
  }, [payments, searchTerm, dateRange]);

  return (
    <div className="space-y-4 px-4">
      <HistoryHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDateChange={setDateRange}
      />
      <Table orders={filteredOrders} loading={loading} error={error} />
    </div>
  );
}

export default HistoryPage;
