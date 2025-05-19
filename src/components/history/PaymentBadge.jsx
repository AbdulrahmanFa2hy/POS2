function PaymentBadge({ type }) {
  const getClassName = () => {
    switch (type.toLowerCase()) {
      case "visa":
        return "bg-success-700 text-white rounded-xl text-sm w-2/3 leading-7 m-auto text-center shadow-lg";
      case "cash":
        return "bg-warning-700 text-white rounded-xl text-sm w-2/3 leading-7 m-auto text-center shadow-lg";
      default:
        return "bg-neutral-200 text-neutral-700 rounded-xl text-sm w-2/3 leading-7 m-auto text-center shadow-lg";
    }
  };

  return <div className={getClassName()}>{type}</div>;
}

export default PaymentBadge;
