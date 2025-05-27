const PaymentModeToggle = ({ paymentMode, setPaymentMode }) => (
  <div className="flex space-x-4 mb-4">
    <button
      onClick={() => setPaymentMode("single")}
      className={`flex-1 py-2 px-4 rounded-md transition-all ${
        paymentMode === "single"
          ? "bg-primary-700 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      Single Payment
    </button>
    <button
      onClick={() => setPaymentMode("split")}
      className={`flex-1 py-2 px-4 rounded-md transition-all ${
        paymentMode === "split"
          ? "bg-primary-700 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      Split Payment
    </button>
  </div>
);

export default PaymentModeToggle;
