import { useEffect, useState } from "react";
import { FaClock, FaTimes, FaTruckMoving } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/StateProvider";

const styles = {
  iconLarge: {
    color: "white",
    backgroundColor: "#32a885",
    opacity: 0.8,
    fontSize: "3em",
    padding: "6px",
    margin: "6px",
    borderRadius: "50%",
  },
};

const Pending = () => {
  const { data } = useData();
  const navigate = useNavigate();
  const [pending, setPending] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [orders, setOrders] = useState([]);

  const handleConfirm = (e, orderId, proposedScheduleDate) => {
    e.preventDefault();
    navigate("/confirm", { state: { orderId, proposedScheduleDate } });
  };
  useEffect(() => {
    for (let i = 0; i < data.orders.length; i++) {
      let order = data.orders[i];
      if (!order.isConfirmed) {
        setPending((prev) => prev + 1);

        let amountQuoted = Number(order.amountQuoted).toLocaleString("en-Us");
        let date = new Date(order.proposedScheduleDate).toDateString();
        let obj = {
          proposedScheduleDate: order.proposedScheduleDate,
          amountQuoted,
          date,
          id: order.id,
          productName: order.productName,
          productWeight: order.productWeight,
          pickupLocation: order.pickupLocation,
          deliveryLocation: order.deliveryLocation,
          deliveryInstructions: order.deliveryInstructions,
        };
        setOrders((prev) => [...prev, obj]);
      }

      if (order.isCancelled) {
        setCancelled((prev) => prev + 1);
      }
    }
    return () => {
      setPending(0);
      setCancelled(0);
      setOrders([]);
    };
  }, [data.trips, data.orders]);

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Pending Orders</span>
      </div>
      {data.orders.length > 0 && (
        <div className="d-flex   flex-wrap">
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Pending
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaClock
                  className="icon iconMenu me-3"
                  style={{ backgroundColor: "#ffc107" }}
                />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {pending}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Cancelled
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaTimes
                  className="icon iconMenu me-3"
                  style={{ backgroundColor: "#DC4C64" }}
                />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {cancelled}
              </span>
            </div>
          </div>

          {pending > 0 &&
            orders.map((order, index) => {
              return (
                <div
                  className="d-flex flex-row m-3 p-4 bg-white shadow-sm rounded"
                  style={{ width: "367px" }}
                  key={index}
                >
                  <span>
                    <FaTruckMoving style={styles.iconLarge} />
                  </span>
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row justify-content-between my-2">
                      <div className="d-flex flex-column">
                        <span className="px-1 text-muted">
                          {order.productName}
                        </span>
                        <span
                          className="px-1"
                          style={{ fontSize: ".6em", fontWeight: "lighter" }}
                        >
                          Product Name
                        </span>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="text-danger">{order.id}</span>
                        <span
                          style={{ fontSize: ".6em", fontWeight: "lighter" }}
                        >
                          Order Number
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column my-2">
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                          <div>
                            <span
                              className="px-1"
                              style={{
                                fontSize: ".6em",
                                fontWeight: "lighter",
                              }}
                            >
                              UGX
                            </span>
                            <span className="text-muted">
                              {order.amountQuoted}
                            </span>
                          </div>
                          <span
                            className="px-1"
                            style={{ fontSize: ".6em", fontWeight: "lighter" }}
                          >
                            Amount
                          </span>
                        </div>
                        <div className="d-flex flex-column">
                          <div>
                            <span className="text-muted px-1">
                              {order.productWeight}
                            </span>
                            <span
                              className="px-1"
                              style={{
                                fontSize: ".6em",
                                fontWeight: "lighter",
                              }}
                            >
                              Tonnes
                            </span>
                          </div>
                          <span
                            className="px-1"
                            style={{ fontSize: ".6em", fontWeight: "lighter" }}
                          >
                            Weight
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-column my-2">
                      <span className="px-1 text-muted">Date</span>
                      <span
                        className="px-1"
                        style={{ fontSize: ".6em", fontWeight: "lighter" }}
                      >
                        Proposed Date
                      </span>
                    </div>
                    <div className="d-flex flex-column my-2">
                      <span className="px-1 text-muted">
                        {order.pickupLocation}
                      </span>
                      <span
                        className="px-1"
                        style={{ fontSize: ".6em", fontWeight: "lighter" }}
                      >
                        Pick up
                      </span>
                    </div>
                    <div className="d-flex flex-column my-2">
                      <span className="px-1 text-muted">
                        {order.deliveryLocation}
                      </span>
                      <span
                        className="px-1"
                        style={{ fontSize: ".6em", fontWeight: "lighter" }}
                      >
                        Drop off
                      </span>
                    </div>
                    {order.deliveryInstructions && (
                      <div className="d-flex flex-column my-2">
                        <span className="px-1 text-muted">
                          {order.deliveryInstructions}
                        </span>
                        <span
                          className="px-1"
                          style={{ fontSize: ".6em", fontWeight: "lighter" }}
                        >
                          Instrutctions
                        </span>
                      </div>
                    )}
                    <div className="px-1 my-2">
                      <button
                        className="btn ridelink-background text-white "
                        onClick={(e) =>
                          handleConfirm(e, order.id, order.proposedScheduleDate)
                        }
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {data.orders.length === 0 && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="lead text-muted">
            <span>No orders have been placed yet</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Pending;
