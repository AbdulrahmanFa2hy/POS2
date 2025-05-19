import pizza from "../assets/img1.jpeg";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "12pm", sales: 20 },
  { time: "1pm", sales: 120 },
  { time: "2pm", sales: 120 },
  { time: "3pm", sales: 70 },
  { time: "4pm", sales: 200 },
  { time: "5pm", sales: 150 },
  { time: "6pm", sales: 80 },
  { time: "7pm", sales: 110 },
  { time: "8pm", sales: 90 },
];

const incomeData = [
  { name: "Food", value: 659 },
  { name: "Drink", value: 229 },
  { name: "Other", value: 186 },
];

const COLORS = ["#246FA8", "#C20A0A", "#EEAA42"];

export default function Dashboard() {
  return (
    <div className="px-2 sm:px-4 md:px-8 py-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-primary-800 text-2xl md:text-3xl font-semibold">
            Yoomy
          </h1>
          <p className="text-sm text-gray-700">20 Aug , 2024</p>
        </div>

        {/* Search */}
        <div className="w-full md:w-1/3">
          <input
            className="w-full border placeholder:text-primary-800 border-primary-800 caret-primary-800 text-primary-800 focus:outline-primary-900 rounded-lg px-3 py-2 lowercase"
            placeholder=" Search "
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-2 sm:m-3">
        <div className="text-center p-2 border-2 border-[#09AE94] rounded-lg text-[#09AE94] font-bold text-xl md:text-2xl">
          <div>Revenue</div>
          <div>4000 AED</div>
        </div>
        <div className="text-center p-2 border-2 border-primary-800 rounded-lg text-primary-800 font-bold text-xl md:text-2xl">
          <div>Orders</div>
          <div>222</div>
        </div>
        <div className="text-center p-2 border-2 border-danger-800 rounded-lg text-danger-800 font-bold text-xl md:text-2xl">
          <div>In Dine</div>
          <div>180</div>
        </div>
        <div className="text-center p-2 border-2 border-warning-700 rounded-lg text-warning-700 font-bold text-xl md:text-2xl">
          <div>Take Away</div>
          <div>42</div>
        </div>
      </div>

      {/* Charts */}
      <div className="my-3 flex flex-col lg:flex-row justify-center items-center gap-4">
        <div className="w-full lg:w-2/3 py-2 sm:p-5 sm:rounded-2xl sm:shadow-md">
          <h5 className="text-xl font-medium mb-2">Daily Sales</h5>
          <div className="w-full h-[240px] ">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="time" stroke="#246FA8" />
                <YAxis stroke="#246FA8" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#246FA8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full lg:w-1/3 py-2 sm:p-5 sm:rounded-2xl sm:shadow-md">
          <h5 className="text-xl font-medium">Total Income</h5>
          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {incomeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-around  mt-2.5  gap-2">
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full bg-primary-800 mr-1"></span>
              Food
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full bg-danger-800 mr-1"></span>
              Drink
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full bg-warning-700 mr-1"></span>
              other
            </div>
          </div>
        </div>
      </div>

      {/* Dishes */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mt-2">
        <div className="w-full lg:w-[48%] p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between">
            <h5 className="text-xl md:text-2xl font-medium">Common dishes</h5>
            <span className="text-sm font-medium text-primary-800">
              <i className="bi bi-arrow-right"></i> View all
            </span>
          </div>
          <div>
            <h4 className="text-lg font-medium">Dishes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center my-3">
                  <div className="w-10 h-10">
                    <img
                      className="rounded-full w-full h-full"
                      src={pizza}
                      alt="User"
                    />
                  </div>
                  <div className="mx-3">
                    <div className="text-primary-800 text-base font-semibold">
                      American Favorite
                    </div>
                    <div className="text-base font-light">
                      It was requested : <span>120</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[48%] p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between">
            <h5 className="text-xl md:text-2xl font-medium">Bad dishes</h5>
            <span className="text-sm font-medium text-primary-800">
              <i className="bi bi-arrow-right"></i> View all
            </span>
          </div>
          <div>
            <h4 className="text-lg font-medium">Dishes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center my-3">
                  <div className="w-10 h-10">
                    <img
                      className="rounded-full w-full h-full"
                      src={pizza}
                      alt="User"
                    />
                  </div>
                  <div className="mx-3">
                    <div className="text-primary-800 text-base font-semibold">
                      American Favorite
                    </div>
                    <div className="text-base font-light">
                      It was requested : <span>120</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
