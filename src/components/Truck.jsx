import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaCheck, FaClock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

import { useOrders } from "../context/StateProvider";
import Loader from "./Loader";

const Truck = () => {
  const { data } = useOrders();
  const [available, setAvailable] = useState(0);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (data.hasOwnProperty("trucks")) {
  //     if (data.trucks.length) {
  //       for (let i = 0; i < data.trucks.length; i++) {
  //         let truck = data.trucks[i];
  //         if (truck.isAvailable) {
  //           setAvailable((prev) => prev + 1);
  //         }
  //       }
  //       setDisplay(true);
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Trucks</span>
      </div>

      {display && (
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Available
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaCheck className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {available}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              On trip
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaClock
                  className="icon iconMenu me-3"
                  style={{ backgroundColor: "#ffc107" }}
                />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {data.trucks.length - available}
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

export default Truck;
