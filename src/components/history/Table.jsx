import { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const LoadingState = () => (
  <div className="flex justify-center items-center py-10">
    <span className="text-lg text-primary-700">Loading payments...</span>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="flex justify-center items-center py-10">
    <span className="text-lg text-red-600">{message}</span>
  </div>
);

function Table({ orders, loading, error }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedOrders = () => {
    if (!sortConfig.key) return orders;

    return [...orders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!orders?.length) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-lg text-neutral-500">No orders found</span>
      </div>
    );
  }

  const sortedOrders = getSortedOrders();

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-white">
            <tr>
              <TableHeader
                label="Order Code"
                field="orderId"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <TableHeader
                label="Date"
                field="date"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <TableHeader
                label="Table"
                field="table"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <TableHeader
                label="Time"
                field="time"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <TableHeader
                label="Amount"
                field="amount"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <th className="px-4 py-5 text-center text-xl text-primary-800">
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200 text-primary-800">
            {sortedOrders.map((order) => (
              <TableRow key={`${order.orderId}-${order.time}`} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
