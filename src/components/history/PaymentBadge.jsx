function PaymentBadge({ type }) {
  // Support multiple payment methods separated by ' & '
  const types = type.split(" & ");

  const getClassName = (t) => {
    switch (t.toLowerCase()) {
      case "visa":
        return "bg-success-700 text-white rounded-xl text-sm w-2/3 leading-7 m-auto text-center shadow-lg";
      case "cash":
        return "bg-warning-700 text-white rounded-xl text-sm w-2/3 leading-7 m-auto text-center shadow-lg";
      default:
        return "bg-neutral-200 text-neutral-700 rounded-xl text-sm w-2/3 leading-7 m-auto text-center shadow-lg";
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {types.map((t, idx) => (
        <div key={idx} className={getClassName(t)}>
          {t}
        </div>
      ))}
    </div>
  );
}

export default PaymentBadge;
