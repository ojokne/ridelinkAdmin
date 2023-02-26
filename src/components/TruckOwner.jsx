import { useData } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TruckOwner = () => {
  const { data } = useData();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (data.hasOwnProperty("truckOwners")) {
      if (data.truckOwners.length) {
        setDisplay(true);
      }
    }
  }, [data]);

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">Truck Owners</div>
      {display && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="table-responsive w-100">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {data.truckOwners.map((owner, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{owner.phoneNumber}</td>
                      <td>{owner.email}</td>
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

export default TruckOwner;
