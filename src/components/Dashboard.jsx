import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCheck, FaClock, FaTruckMoving, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { ACTIONS } from "../context/actions";
import { useOrders } from "../context/StateProvider";
import Loader from "./Loader";
// import PieChart from "./PieChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { ordersDispatch } = useOrders();
  const [data, setData] = useState();
  const [confirmed, setConfirmed] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [clients, setClients] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [truckOwners, setTruckOwners] = useState([]);
  const [orders, setOrders] = useState([]);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const [pending, setPending] = useState(0);
  const [trip, setTrip] = useState(0);
  const [delivered, setDelivered] = useState(0);
  // const [element, setElement] = useState(null);

  useEffect(() => {
    let unsubcribeFromFirestore;
    const unsubcribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const querySnapShot = query(collection(db, "eOrders"), "eOrders");
        unsubcribeFromFirestore = onSnapshot(querySnapShot, (snapshot) => {
          if (snapshot.empty) {
            setDisplay(false);
            setLoading(false);
          } else {
            for (let i = 0; i < snapshot.docs.length; i++) {
              let order = snapshot.docs[i].data();
              if (order.isConfirmed) {
                if (order.isDelivered) {
                  setDelivered((prev) => prev + 1);
                } else {
                  setTrip((prev) => prev + 1);
                }
              } else {
                setPending((prev) => prev + 1);
              }
            }

            let ordersArray = [];
            for (let i = 0; i < snapshot.docs.length; i++) {
              const order = {
                ...snapshot.docs[i].data(),
                id: snapshot.docs[i].id,
              };
              ordersArray.push(order);
            }

            ordersDispatch({ type: ACTIONS.ADD_ORDERS, orders: ordersArray });
            setLoading(false);
            setDisplay(true);
          }
        });
      } else {
        navigate("/login");
        if (unsubcribeFromFirestore) {
          unsubcribeFromFirestore();
        }
      }
    });
    return () => {
      unsubcribeFromAuth();
      setDelivered(0);
      setTrip(0);
      setPending(0);
      if (unsubcribeFromFirestore) {
        unsubcribeFromFirestore();
      }
    };
  }, [navigate]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Dashboard</span>
      </div>
      {display && (
        <div className="d-flex align-items-center flex-wrap">
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Pending Orders
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
            <div className="mt-3">
              {pending > 0 ? (
                <Link
                  to="pending"
                  className="text-decoration-none ridelink-color"
                >
                  View orders pending confirmation
                </Link>
              ) : (
                <span className="text-muted">No orders delivered</span>
              )}
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              On Trip
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaTruckMoving
                  className="icon iconMenu me-3"
                  style={{ backgroundColor: "#ffc107" }}
                />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {trip}
              </span>
            </div>
            <div className="mt-3">
              {trip > 0 ? (
                <Link to="trip" className="text-decoration-none ridelink-color">
                  View orders on trip
                </Link>
              ) : (
                <span className="text-muted">No orders on trip</span>
              )}
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
                <FaCheck className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {delivered}
              </span>
            </div>
            <div className="mt-3">
              {delivered > 0 ? (
                <Link
                  to="delivered"
                  className="text-decoration-none ridelink-color"
                >
                  View orders delivered
                </Link>
              ) : (
                <span className="text-muted">No orders delivered</span>
              )}
            </div>
          </div>
        </div>
      )}
      {!display && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="lead text-muted text-center">
            <p>No data to display</p>
          </div>
        </div>
      )}
      {/* <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
        {element}
      </div> */}
    </div>
  );
};

export default Dashboard;
