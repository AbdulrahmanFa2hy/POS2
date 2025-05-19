import { useState } from "react";
import { RiArrowUpDownLine, RiSearchLine } from "react-icons/ri";
import PaymentBadge from "../components/history/PaymentBadge";
import HistoryHeader from "../components/history/HistoryHeader";
import OrdersTable from "../components/history/OrdersTable";

const ordersData = [
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "VISA",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "Cash",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "VISA",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "VISA",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "VISA",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "Cash",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "Cash",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "Cash",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "Cash",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "VISA",
  },
  {
    orderId: "#22222",
    date: "5 May,2025",
    table: "T1",
    time: "1:30pm",
    amount: "260 AED",
    paymentMethod: "VISA",
  },
];

function HistoryPage() {
  return (
    <div className="space-y-4 px-4">
      <HistoryHeader />
      <OrdersTable orders={ordersData} />
    </div>
  );
}

export default HistoryPage;
