import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTables } from "../store/tableSlice";
import { fetchOrderByTable, deleteMealFromOrder } from "../store/orderSlice";
import AddMealModal from "../components/orders/AddMealModal";
import ChangeTableModal from "../components/orders/ChangeTableModal";
import { FaTrash } from "react-icons/fa";
import img from "../assets/img5.jpeg";
const TableOrderDetails = () => {
  const { tableNumber } = useParams();
  const dispatch = useDispatch();

  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [isChangeTableModalOpen, setIsChangeTableModalOpen] = useState(false);

  const { currentOrder, loading: orderLoading } = useSelector(
    (state) => state.order
  );
  const { tables } = useSelector((state) => state.table);
  const { user } = useSelector((state) => state.auth);

  const isManager = user?.role === "manager";

  useEffect(() => {
    dispatch(fetchOrderByTable(tableNumber));
    dispatch(fetchTables());
  }, [dispatch, tableNumber]);

  const handleDeleteMeal = async (mealId) => {
    if (!currentOrder?._id) return;

    try {
      await dispatch(
        deleteMealFromOrder({
          orderId: currentOrder._id,
          mealId,
        })
      ).unwrap();

      dispatch(fetchOrderByTable(tableNumber));
    } catch (error) {
      console.error("Failed to delete meal:", error);
    }
  };

  if (orderLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">
          T{tableNumber} / {currentOrder && `${currentOrder.orderCode}`}
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => setIsAddMealModalOpen(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add Meal
          </button>
          <button
            onClick={() => setIsChangeTableModalOpen(true)}
            className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Change Table
          </button>
        </div>
      </div>

      {/* Order Details */}
      {currentOrder ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-600">
                    Price
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-neutral-600">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-600">
                    Total
                  </th>
                  {isManager && (
                    <th className="px-4 py-3 text-center text-sm font-semibold text-neutral-600">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {currentOrder.orderItemsData?.map((meal) => {
                  const orderItem = currentOrder.orderItems.find(
                    (item) => item.mealId === meal._id
                  );

                  return (
                    <tr
                      key={`meal-${meal._id}`}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={img}
                          alt={meal.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="font-medium text-neutral-800">
                            {meal.name}
                          </div>
                          {meal.ingredients && (
                            <div className="text-xs text-neutral-500 line-clamp-1">
                              {meal.ingredients}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        ${meal.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-neutral-600 text-center">
                        {orderItem?.quantity}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        ${(orderItem?.quantity * meal.price).toFixed(2)}
                      </td>
                      {isManager && (
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteMeal(meal._id)}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete meal"
                          >
                            <FaTrash size={14} />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="border-t bg-neutral-50 p-4 space-y-2">
            <div className="flex justify-end items-center">
              <span className="text-neutral-600 mr-4">Subtotal:</span>
              <span className="font-medium w-32 text-right">
                ${currentOrder.subtotalPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-end items-center text-green-600">
                <span className="mr-4">Discount:</span>
                <span className="w-32 text-right">
                  -${currentOrder.discount?.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-end items-center text-lg font-bold border-t border-neutral-200 pt-2">
              <span className="mr-4">Total:</span>
              <span className="w-32 text-right">
                ${currentOrder.totalPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
            {currentOrder.status && (
              <div className="flex justify-end items-center mt-2">
                <span className="text-neutral-600 mr-4">Status:</span>
                <span className="capitalize font-medium w-32 text-right">
                  {currentOrder.status}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-neutral-600">
          No order found for this table.
        </p>
      )}

      {/* Modals */}
      {isAddMealModalOpen && (
        <AddMealModal
          isOpen={isAddMealModalOpen}
          onClose={() => setIsAddMealModalOpen(false)}
          orderId={currentOrder?._id}
        />
      )}

      {isChangeTableModalOpen && (
        <ChangeTableModal
          isOpen={isChangeTableModalOpen}
          onClose={() => setIsChangeTableModalOpen(false)}
          orderId={currentOrder?._id}
          availableTables={tables.filter((t) => t.isAvailable)}
        />
      )}
    </div>
  );
};

export default TableOrderDetails;
