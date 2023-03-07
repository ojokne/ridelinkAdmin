import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaTruckMoving,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { ACTIONS } from "../context/actions";
import { useData } from "../context/StateProvider";
import useToken from "../utils/useToken";
import Loader from "./Loader";
// import PieChart from "./PieChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { dataDispatch } = useData();
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
  // const [element, setElement] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(
  //         `${process.env.REACT_APP_API_HOST}/admin/data`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       const data = await res.json();
  //       setData((prev) => {
  //         return { ...prev, data: data.data };
  //       });
  //       dataDispatch({ type: ACTIONS.ADD_DATA, data: data.data });
  //       if (data.data) {
  //         setDrivers(data.data.drivers.length);
  //         setClients(data.data.clients.length);
  //         setTrucks(data.data.trucks.length);
  //         setTruckOwners(data.data.truckOwners.length);
  //         setOrders(data.data.orders.length);

  //         for (let i = 0; i < data.data.orders.length; i++) {
  //           let order = data.data.orders[i];
  //           if (order.isConfirmed) {
  //             setConfirmed((prev) => prev + 1);
  //           }
  //           setRevenue((prev) => prev + order.amountQuoted);
  //         }
  //         setDisplay(true);
  //       }
  //       // setElement(() => {
  //       //   return data.data.orders.length > 0 ? (
  //       //     <PieChart
  //       //       confirmed={confirmed}
  //       //       pending={data.data.orders.length - confirmed}
  //       //     />
  //       //   ) : (
  //       //     <div className="lead text-muted">
  //       //       <span>No orders to plot chart</span>
  //       //     </div>
  //       //   );
  //       // });
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, [dataDispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate("/login");
      }
    });
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
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Orders
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaShoppingCart className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {orders}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Revenue
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaDollarSign className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {revenue.toLocaleString("en-US")}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Clients
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaUser className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {clients}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Drivers
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaUser className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {drivers}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Trucks
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaTruckMoving className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {trucks}
              </span>
            </div>
          </div>
          <div
            style={{ width: "367px" }}
            className="m-3 p-4 bg-white shadow-sm rounded"
          >
            <span className="text-muted" style={{ fontSize: "20px" }}>
              Truck Owners
            </span>
            <div className="d-flex align-items-center">
              <span>
                <FaUser className="icon iconMenu me-3" />
              </span>
              <span className="me-3" style={{ fontSize: "30px" }}>
                {truckOwners}
              </span>
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
