import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { processPayment } from "../../../store/paymentSlice";
import NumberInput from "./NumberInput";
import PaymentMethodSelect from "./PaymentMethodSelect";
import OrderSummary from "./OrderSummary";
import PaymentModeToggle from "./PaymentModeToggle";
import SplitPaymentRow from "./SplitPaymentRow";

function PaymentSection({
  tax,
  setTax,
  discount,
  setDiscount,
  subtotal,
  discountAmount,
  handlePrint,
}) {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.order);
  const { loading } = useSelector((state) => state.payment);

  const [paymentMode, setPaymentMode] = useState("single");
  const [singlePaymentMethod, setSinglePaymentMethod] = useState("cash");
  const [splitPayments, setSplitPayments] = useState([
    { method: "cash", amount: "" },
    { method: "visa", amount: "" },
  ]);

  // Calculate tax amount and final total
  const taxAmount = (subtotal * (tax || 0)) / 100;
  const finalTotal = subtotal - discountAmount + taxAmount;

  // Split payment handlers
  const handleSplitMethodChange = useCallback((index, method) => {
    setSplitPayments((prev) => {
      const updated = [...prev];
      updated[index].method = method;
      return updated;
    });
  }, []);

  const handleSplitAmountChange = useCallback((index, amount) => {
    setSplitPayments((prev) => {
      const updated = [...prev];
      updated[index].amount = amount;
      return updated;
    });
  }, []);

  // Calculate remaining amount for split payments
  const totalSplitAmount = splitPayments.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount) || 0;
    return sum + amount;
  }, 0);
  const remainingAmount = finalTotal - totalSplitAmount;

  // Validation helpers
  const validateSplitPayments = () => {
    const validPayments = splitPayments.filter((payment) => {
      const amount = parseFloat(payment.amount) || 0;
      return amount > 0;
    });

    if (validPayments.length === 0) {
      return {
        isValid: false,
        message: "Please enter at least one payment amount",
      };
    }

    // Allow overpayment but process only the required amount
    const totalPaid = validPayments.reduce((sum, payment) => {
      return sum + parseFloat(payment.amount);
    }, 0);

    if (totalPaid < finalTotal) {
      return {
        isValid: false,
        message: `Need ${(finalTotal - totalPaid).toFixed(2)} AED more`,
      };
    }

    // If overpaid, adjust the payments to match the required total
    if (totalPaid > finalTotal) {
      const adjustedPayments = [...validPayments];
      let remaining = finalTotal;

      for (let i = 0; i < adjustedPayments.length; i++) {
        const paymentAmount = parseFloat(adjustedPayments[i].amount);
        if (remaining >= paymentAmount) {
          remaining -= paymentAmount;
        } else {
          adjustedPayments[i].amount = remaining;
          remaining = 0;
          // Remove any remaining payments
          adjustedPayments.splice(i + 1);
          break;
        }
      }

      return { isValid: true, payments: adjustedPayments };
    }

    return { isValid: true, payments: validPayments };
  };

  const handlePayment = async () => {
    if (!currentOrder) {
      toast.error("No order selected");
      return;
    }

    try {
      let paymentMethods = [];

      if (paymentMode === "single") {
        paymentMethods = [
          {
            method: singlePaymentMethod,
            amount: finalTotal,
          },
        ];
      } else {
        const validation = validateSplitPayments();
        if (!validation.isValid) {
          toast.error(validation.message);
          return;
        }
        paymentMethods = validation.payments.map((payment) => ({
          method: payment.method,
          amount: parseFloat(payment.amount).toFixed(2),
        }));
      }

      await dispatch(
        processPayment({
          orderId: currentOrder._id,
          paymentMethods,
          tax: tax || 0,
          discount: discount || 0,
        })
      ).unwrap();

      toast.success("Payment processed successfully!", {
        duration: 3000,
        icon: "✅",
      });
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.", {
        duration: 4000,
        icon: "❌",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-2 sm:p-6 space-y-6">
      {/* Tax and Discount Section */}
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label="Tax (%)"
          value={tax}
          onChange={setTax}
          placeholder="0"
          min="0"
          max="100"
          step="0.1"
        />
        <NumberInput
          label="Discount (%)"
          value={discount}
          onChange={setDiscount}
          placeholder="0"
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      {/* Order Summary */}
      <OrderSummary
        subtotal={subtotal}
        discount={discount}
        discountAmount={discountAmount}
        tax={tax}
        taxAmount={taxAmount}
        finalTotal={finalTotal}
      />

      {/* Payment Method Section */}
      <div>
        <label className="hidden sm:block text-sm font-medium text-gray-700 mb-3">
          Payment Method
        </label>

        <PaymentModeToggle
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
        />

        {/* Single Payment */}
        {paymentMode === "single" && (
          <PaymentMethodSelect
            value={singlePaymentMethod}
            onChange={(e) => setSinglePaymentMethod(e.target.value)}
          />
        )}

        {/* Split Payment */}
        {paymentMode === "split" && (
          <div className="space-y-3">
            {splitPayments.map((payment, index) => (
              <SplitPaymentRow
                key={index}
                payment={payment}
                index={index}
                onMethodChange={handleSplitMethodChange}
                onAmountChange={handleSplitAmountChange}
                finalTotal={finalTotal}
              />
            ))}

            <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
              Remaining:{" "}
              <span
                className={`font-medium ${
                  remainingAmount > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {remainingAmount.toFixed(2)} AED
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handlePayment}
          disabled={loading || !currentOrder}
          className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Processing..." : `Pay ${finalTotal.toFixed(2)} AED`}
        </button>

        <button
          onClick={handlePrint}
          className="w-full py-2 px-4 bg-primary-700 text-white rounded-md hover:bg-primary-800 transition-colors"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}

export default PaymentSection;
