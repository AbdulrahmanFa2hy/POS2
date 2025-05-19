import { useState } from "react";
import { RiArrowUpDownLine } from "react-icons/ri";
import PaymentBadge from "./PaymentBadge";

function OrdersTable({ orders }) {
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

  const sortedOrders = getSortedOrders();

  const TableHeader = ({ label, field }) => (
    <th
      className="px-4 py-5 text-left text-xl text-primary-800 cursor-pointer hover:text-primary-900"
      onClick={() => requestSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <RiArrowUpDownLine
          className={`transition-colors ${
            sortConfig.key === field ? "text-primary-800" : "text-neutral-400"
          }`}
        />
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-white">
            <tr>
              <TableHeader label="Order Id" field="orderId" />
              <TableHeader label="Date" field="date" />
              <TableHeader label="Table" field="table" />
              <TableHeader label="Time" field="time" />
              <TableHeader label="Amount" field="amount" />
              <th className="px-4 py-5 text-center text-xl text-primary-800">
                Payment Method
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200 text-primary-800">
            {sortedOrders.map((order) => (
              <tr
                key={`${order.orderId}-${order.time}`}
                className="hover:bg-neutral-50 transition-colors "
              >
                <td className="px-4 py-4 text-sm font-medium ">
                  {order.orderId}
                </td>
                <td className="px-4 py-4 text-sm ">{order.date}</td>
                <td className="px-4 sm:px-10 py-4 text-sm ">{order.table}</td>
                <td className="px-4 py-4 text-sm ">{order.time}</td>
                <td className="px-4 sm:px-8 py-4 text-sm ">{order.amount}</td>
                <td className="px-4 py-4">
                  <PaymentBadge type={order.paymentMethod} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;
