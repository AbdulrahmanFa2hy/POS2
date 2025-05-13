const DashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Today&apos;s Sales</h2>
          <p className="text-3xl font-bold text-[#1e62b3]">$1,254.00</p>
          <p className="text-sm text-neutral-500 mt-2">+12% from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Active Orders</h2>
          <p className="text-3xl font-bold text-[#1e62b3]">24</p>
          <p className="text-sm text-neutral-500 mt-2">4 pending delivery</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Customers</h2>
          <p className="text-3xl font-bold text-[#1e62b3]">142</p>
          <p className="text-sm text-neutral-500 mt-2">+8 new today</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
