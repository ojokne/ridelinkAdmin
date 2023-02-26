import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { useData } from "../context/StateProvider";

const Confirmed = () => {
  const { data } = useData();
  const [delivered, setDelivered] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (data.hasOwnProperty("orders")) {
      if (data.clients.length) {
        for (let i = 0; i < data.orders.length; i++) {
          let order = data.orders[i];
          if (order.isConfirmed) {
            setConfirmed((prev) => prev + 1);
          }
        }
        for (let i = 0; i < data.trips.length; i++) {
          let trip = data.trips[i];
          if (trip.idDelivered) {
            setDelivered((prev) => prev + 1);
          }
        }
      }
      setDisplay(true);
    }
  }, [data]);
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Confirmed Orders</span>
      </div>
      {display && (
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Confirmed
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaShoppingCart className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {confirmed}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Delivered
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaCheck
                  className="icon iconMenu me-3"
                  style={{ backgroundColor: "#ffc107" }}
                />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {delivered}
              </span>
            </div>
          </div>
        </div>
      )}
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
export default Confirmed;
