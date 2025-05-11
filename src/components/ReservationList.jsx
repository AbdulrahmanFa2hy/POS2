import { FaUser, FaSearch } from "react-icons/fa";

const ReservationItem = ({ time, reservations }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">{time}</h3>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-primary-600">
                {reservation.table}
              </span>
            </div>

            <div className="flex-1">
              <h4 className="font-medium">{reservation.name}</h4>
              <div className="flex items-center text-sm text-neutral-500">
                <FaUser className="mr-1" />
                <span>{reservation.people} Person</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReservationList = ({ reservations }) => {
  // Group reservations by time
  const groupedReservations = reservations.reduce((groups, reservation) => {
    const time = reservation.time;
    if (!groups[time]) {
      groups[time] = [];
    }
    groups[time].push(reservation);
    return groups;
  }, {});

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
      </div>

      {/* Status Indicators */}
      <div className="flex gap-3 mb-6">
        <div className="inline-flex items-center px-3 py-1 bg-danger-50 text-danger-600 text-sm font-medium rounded-full">
          Reserved (3)
        </div>
        <div className="inline-flex items-center px-3 py-1 bg-warning-50 text-warning-600 text-sm font-medium rounded-full">
          In progress (3)
        </div>
      </div>

      {/* Reservation Lists */}
      {Object.entries(groupedReservations).map(([time, reservations]) => (
        <ReservationItem key={time} time={time} reservations={reservations} />
      ))}
    </div>
  );
};

export default ReservationList;
