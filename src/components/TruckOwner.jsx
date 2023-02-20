import { useData } from "../context/StateProvider";

const TruckOwner = () => {
  const { data } = useData();

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">Truck Owners</div>
      {data.truckOwners.length > 0 && (
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
      {data.truckOwners.length === 0 && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="lead text-muted">
            <span>No truck owners to display</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruckOwner;
