const OrderPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Active Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Table
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Items
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Total
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-4">#12345</td>
                <td className="py-4 px-4">Table 2</td>
                <td className="py-4 px-4">2 × Pizza, 1 × Salad</td>
                <td className="py-4 px-4">$42.50</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    In Progress
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-[#1e62b3] hover:underline">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4">#12344</td>
                <td className="py-4 px-4">Table 5</td>
                <td className="py-4 px-4">1 × Pasta, 2 × Drinks</td>
                <td className="py-4 px-4">$31.20</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Ready
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-[#1e62b3] hover:underline">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4">#12343</td>
                <td className="py-4 px-4">Table 1</td>
                <td className="py-4 px-4">3 × Burger, 3 × Fries</td>
                <td className="py-4 px-4">$57.80</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Delivered
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-[#1e62b3] hover:underline">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
