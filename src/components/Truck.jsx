import { useEffect, useState } from "react";
import { FaCheck, FaClock } from "react-icons/fa";
import { useData } from "../context/StateProvider";

const Truck = () => {
  const { data } = useData();
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    for (let i = 0; i < data.trucks.length; i++) {
      let truck = data.trucks[i];
      if (truck.isAvailable) {
        setAvailable((prev) => prev + 1);
      }
    }
    return () => {
      setAvailable(0);
    };
  }, [data.trucks]);
  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Trucks</span>
      </div>

      {data.trucks.length > 0 && (
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

      {data.trucks.length === 0 && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="lead text-muted">
            <span>No trucks to display</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Truck;
