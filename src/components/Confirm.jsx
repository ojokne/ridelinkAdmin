import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useOrders } from "../context/StateProvider";
import Loader from "./Loader";

const Confirm = () => {
  const { data } = useOrders();
  const { state } = useLocation();
  const [scheduleDate, setScheduleDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  const [availableTrucksError, setAvailableTrucksError] = useState(
    "There are no free trucks available "
  );
  const [availableDriversError, setAvailableDriversError] = useState(
    "There are no free drivers available"
  );

  const truckRef = useRef();
  const driverRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/pending");
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderId = state.orderId;
    const truckId = truckRef.current.getAttribute("data-id");
    const driverId = driverRef.current.getAttribute("data-id");

    try {
      await updateDoc(doc(db, "eOrders", orderId), {
        scheduleDate,
        driverId,
        truckId,
        isConfirmed: true,
      });
      await updateDoc(doc(db, "eTrucks", truckId), {
        isAvailable: false,
      });

      await updateDoc(doc(db, "eDrivers", driverId), {
        isAvailable: false,
      });
      navigate("/");
      setLoading(false);
    } catch (e) {
      setLoading(false);

      console.log(e);
      setAlert((prev) => {
        return { ...prev, alert: true, message: "Could not confirm order" };
      });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        setLoading(false);
      } else {
        setScheduleDate(
          new Date(state.scheduleDate).toISOString().slice(0, 10)
        );

        try {
          let drivers = await getDocs(collection(db, "eDrivers"));
          let trucks = await getDocs(collection(db, "eTrucks"));
          if (!drivers.empty) {
            for (let i = 0; i < drivers.docs.length; i++) {
              let driver = {
                ...drivers.docs[i].data(),
                id: drivers.docs[i].id,
              };
              if (driver.isAvailable) {
                setAvailableDrivers((prev) => [...prev, driver]);
                setAvailableDriversError("");
              }
            }
          }
          if (!trucks.empty) {
            for (let i = 0; i < trucks.docs.length; i++) {
              let truck = {
                ...trucks.docs[i].data(),
                id: trucks.docs[i].id,
              };
              if (truck.isAvailable) {
                setAvailableTrucks((prev) => [...prev, truck]);
                setAvailableTrucksError("");
              }
            }
          }
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    });

    return () => {
      setAvailableDrivers([]);
      setAvailableTrucks([]);
    };
  }, [navigate]);

  if (loading) {
    return <Loader loading={loading} description="Please wait" />;
  }

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Confirm Order</span>
      </div>
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="bg-white rounded  shadow-sm m-3 p-3">
          {alert.alert && (
            <div className="mx-auto">
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          )}
          <div className="mx-auto">
            <form>
              <div className="m-3">
                <label htmlFor="email" className="form-label">
                  Schedule Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="email"
                  value={scheduleDate}
                  required
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
              <div className="m-3">
                <label htmlFor="trucks" className="form-label">
                  Truck
                </label>
                <input
                  className="form-control"
                  list="trucksList"
                  id="trucks"
                  placeholder="Enter Registration Number to search..."
                />
                <datalist id="trucksList">
                  {availableTrucks.map((truck, index) => {
                    return (
                      <option
                        key={index}
                        value={truck.regNumber}
                        data-id={truck.id}
                        ref={truckRef}
                      />
                    );
                  })}
                </datalist>
                {availableTrucksError && (
                  <div
                    className="text-danger small my-2 muted"
                    style={{ fontSize: ".6em" }}
                  >
                    <span>{availableTrucksError}</span>
                  </div>
                )}
              </div>
              <div className="m-3">
                <label htmlFor="drivers" className="form-label">
                  Driver
                </label>
                <input
                  className="form-control"
                  list="driversList"
                  id="drivers"
                  placeholder="Enter email to search..."
                />
                <datalist id="driversList">
                  {availableDrivers.map((driver, index) => {
                    return (
                      <option
                        key={index}
                        value={driver.email}
                        data-id={driver.id}
                        ref={driverRef}
                      />
                    );
                  })}
                </datalist>
                {availableDriversError && (
                  <div
                    className="text-danger small my-2 muted"
                    style={{ fontSize: ".6em" }}
                  >
                    <span>{availableDriversError}</span>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between p-3">
                <button
                  className="btn btn-outline-success"
                  onClick={(e) => handleCancel(e)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={
                    availableDrivers.length > 0 && availableTrucks.length > 0
                      ? "btn ridelink-background text-white"
                      : "btn"
                  }
                  disabled={
                    availableDrivers.length > 0 && availableTrucks.length > 0
                      ? false
                      : true
                  }
                  onClick={(e) => handleConfirm(e)}
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
