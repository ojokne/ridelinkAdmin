import { useEffect, useRef, useState } from "react";
import {
  FaDollarSign,
  FaShoppingCart,
  FaTruckMoving,
  FaUser,
} from "react-icons/fa";
import { ACTIONS } from "../context/actions";
import { useData } from "../context/StateProvider";
import Loader from "./Loader";
import PieChart from "./PieChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { data, dataDispatch } = useData();

  const [confirmed, setConfirmed] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const effectRan = useRef(false);
  const element =
    data.orders.length > 0 ? (
      <PieChart
        confirmed={confirmed}
        pending={data.orders.length - confirmed}
      />
    ) : (
      <div className="lead text-muted">
        <span>No orders to plot chart</span>
      </div>
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_HOST}/admin/data`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        dataDispatch({ type: ACTIONS.ADD_DATA, data: data.data });

        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (!effectRan.current) {
      fetchData();
      for (let i = 0; i < data.orders.length; i++) {
        let order = data.orders[i];
        if (order.isConfirmed) {
          setConfirmed((prev) => prev + 1);
        }
        setRevenue((prev) => prev + order.amountQuoted);
      }

      return () => {
        setConfirmed(0);
        effectRan.current = true;
      };
    }
  }, [data, dataDispatch]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Dashboard</span>
      </div>
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
              {data.orders.length}
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
              {data.clients.length}
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
              {data.drivers.length}
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
              {data.trucks.length}
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
              {data.truckOwners.length}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
        {element}
      </div>
    </div>
  );
};

export default Dashboard;
