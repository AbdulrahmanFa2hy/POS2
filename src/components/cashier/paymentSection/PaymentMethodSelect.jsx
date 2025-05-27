const PaymentMethodSelect = ({ value, onChange, className = "" }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
  >
    <option value="cash">Cash</option>
    <option value="visa">Visa/Card</option>
  </select>
);

export default PaymentMethodSelect;
