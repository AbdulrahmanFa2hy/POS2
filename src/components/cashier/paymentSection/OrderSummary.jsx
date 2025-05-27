const OrderSummary = ({
  subtotal,
  discount,
  discountAmount,
  tax,
  taxAmount,
  finalTotal,
}) => (
  <div className="bg-gray-50 rounded-lg p-2 sm:p-4 space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Subtotal:</span>
      <span className="font-medium">{subtotal.toFixed(2)} AED</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Discount ({discount || 0}%):</span>
      <span className="font-medium text-red-600">
        -{discountAmount.toFixed(2)} AED
      </span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">Tax ({tax || 0}%):</span>
      <span className="font-medium">+{taxAmount.toFixed(2)} AED</span>
    </div>
    <div className="border-t border-gray-300 pt-2">
      <div className="flex justify-between text-lg font-bold">
        <span>Total:</span>
        <span className="text-primary-700">{finalTotal.toFixed(2)} AED</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;
