const HistoryPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Past Orders</h2>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg p-2 text-sm">
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <button className="bg-[#1e62b3] text-white px-4 py-2 rounded-lg text-sm">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                  Customer
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-4">#12340</td>
                <td className="py-4 px-4">May 4, 2025</td>
                <td className="py-4 px-4">Ali Adel</td>
                <td className="py-4 px-4">3 items</td>
                <td className="py-4 px-4">$46.50</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4">#12339</td>
                <td className="py-4 px-4">May 4, 2025</td>
                <td className="py-4 px-4">Ahmed Hassan</td>
                <td className="py-4 px-4">5 items</td>
                <td className="py-4 px-4">$72.30</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4">#12338</td>
                <td className="py-4 px-4">May 3, 2025</td>
                <td className="py-4 px-4">Sara Mohamed</td>
                <td className="py-4 px-4">2 items</td>
                <td className="py-4 px-4">$28.90</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                    Cancelled
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4">#12337</td>
                <td className="py-4 px-4">May 3, 2025</td>
                <td className="py-4 px-4">Fatima Ali</td>
                <td className="py-4 px-4">4 items</td>
                <td className="py-4 px-4">$54.60</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded-md text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-[#1e62b3] text-white rounded-md text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded-md text-sm">2</button>
            <button className="px-3 py-1 border rounded-md text-sm">3</button>
            <button className="px-3 py-1 border rounded-md text-sm">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
