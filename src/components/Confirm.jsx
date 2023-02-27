import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "../context/StateProvider";
import Loader from "./Loader";

const Confirm = () => {
  const { data } = useData();
  const { state } = useLocation();
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const truckRef = useRef();
  const driverRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
  });

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderId = state.orderId;
    const truckId = truckRef.current.getAttribute("data-id");
    const driverId = driverRef.current.getAttribute("data-id");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_HOST}/admin/confirm/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scheduleDate,
            driverId,
            truckId,
            role: 0,
          }),
          credentials: "include",
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.isConfirmed) {
        navigate("/");
      } else {
        setAlert((prev) => {
          return {
            ...prev,
            alert: true,
            message: "Something went wrong ,try again",
          };
        });
      }
    } catch (e) {
      console.log(e);
      setAlert((prev) => {
        return {
          ...prev,
          alert: true,
          message: "An error occurred, Please try again",
        };
      });
    }
  };

  useEffect(() => {
    if ((state?.id ?? false) && (state?.proposedScheduleDate ?? false)) {
      navigate("/pending");
    }
    setScheduleDate(state.proposedScheduleDate);
    for (let i = 0; i < data.trucks.length; i++) {
      let truck = data.trucks[i];
      if (truck.isAvailable) {
        setAvailableTrucks((prev) => [...prev, truck]);
      }
    }
    for (let i = 0; i < data.drivers.length; i++) {
      let driver = data.drivers[i];
      if (driver.isAvailable) {
        setAvailableDrivers((prev) => [...prev, driver]);
      }
    }
    return () => {
      setAvailableTrucks([]);
      setAvailableDrivers([]);
    };
  }, [data, state, navigate]);

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
              </div>
              <button
                type="submit"
                className="m-3 btn ridelink-background text-white "
                onClick={(e) => handleConfirm(e)}
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
