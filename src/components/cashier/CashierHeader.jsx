import { format } from "date-fns";

function CashierHeader() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, d MMMM, yyyy");

  return (
    <div className="flex justify-between items-center mb-4 sm:mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Cashier</h1>
      <div className="text-sm text-gray-600 font-medium">{formattedDate}</div>
    </div>
  );
}

export default CashierHeader;
