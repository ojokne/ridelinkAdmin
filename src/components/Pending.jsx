import { useEffect, useState } from "react";
import { FaTimes, FaTruckMoving } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Loader from "./Loader";

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
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleConfirm = (e, orderId, scheduleDate) => {
    e.preventDefault();
    navigate("/confirm", { state: { orderId, scheduleDate } });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        if (orders.hasOwnProperty("orders")) {
          if (orders.orders.length) {
            for (let i = 0; i < orders.orders.length; i++) {
              let order = orders.orders[i];
              if (!order.isConfirmed) {
                let amountQuoted = Number(order.amountQuoted).toLocaleString(
                  "en-Us"
                );
                let date = new Date(order.scheduleDate).toDateString();

                order = {
                  ...order,
                  amountQuoted: amountQuoted,
                  scheduleDate: new Date(order.scheduleDate)
                    .toISOString()
                    .slice(0, 10),
                  date,
                };
                setPending((prev) => [...prev, order]);
              }
            }
          }
          setDisplay(true);
        }
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted d-flex justify-content-between align-items-center">
        <span>Pending Orders</span>
        <span>
          <Link to="/" className="text-decoration-none ridelink-color">
            <FaTimes
              className="icon iconSmall me-3"
              style={{ backgroundColor: "red" }}
            />
          </Link>
        </span>
      </div>

      <div className="d-flex flex-wrap">
        {pending.map((order, index) => {
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
                <div className="d-flex flex-column my-2">
                  <span className="text-danger px-1">{order.id}</span>
                  <span
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                    className="px-1"
                  >
                    Order Number
                  </span>
                </div>
                <div className="d-flex flex-column my-2">
                  <span className="px-1 text-muted">{order.productName}</span>
                  <span
                    className="px-1"
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                  >
                    Product Name
                  </span>
                </div>

                <div className="d-flex flex-column my-2">
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
                    <span className="text-muted">{order.amountQuoted}</span>
                  </div>
                  <span
                    className="px-1"
                    style={{ fontSize: ".6em", fontWeight: "lighter" }}
                  >
                    Amount
                  </span>
                </div>
                <div className="d-flex flex-column my-2">
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

                <div className="d-flex flex-column my-2">
                  <span className="px-1 text-muted">{order.date}</span>
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
                      handleConfirm(e, order.id, order.scheduleDate)
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

      {!display && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="lead text-muted text-center">
            <p>No data to display</p>
            <Link to="/" className="text-decoration-none">
              Back home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Pending;
