import { useData } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Driver = () => {
  const { data } = useData();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (data.hasOwnProperty("drivers")) {
      if (data.drivers.length) {
        setDisplay(true);
      }
    }
  }, [data]);

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Drivers</span>
      </div>
      {display && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="table-responsive w-100">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Permit Number</th>
                  <th scope="col">NIN</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {data.drivers.map((driver, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{driver.permitNumber}</td>
                      <td>{driver.nin}</td>
                      <td>{driver.phoneNumber}</td>
                      <td>{driver.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default Driver;
