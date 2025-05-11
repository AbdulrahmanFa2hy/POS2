const SettingPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-[#edf4fb] text-[#1e62b3] rounded-lg font-medium">
                General Settings
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                User Profile
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                Notifications
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                Security
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                Theme & Display
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                Integrations
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  defaultValue="Yoomy Restaurant"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Address
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg h-24"
                  defaultValue="123 Restaurant Street, Foodie District, City Name, 12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  defaultValue="contact@yoomy.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  defaultValue="+1 234 567 890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button className="bg-[#1e62b3] text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
