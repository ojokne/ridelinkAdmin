import { useData } from "../context/StateProvider";

const Client = () => {
  const { data } = useData();

  return (
    <div>
      <div className="mx-3 pt-3 lead text-muted">
        <span>Clients</span>
      </div>
      {data.clients.length > 0 && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="table-responsive w-100">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((client, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{client.name}</td>
                      <td>{client.phoneNumber}</td>
                      <td>{client.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data.clients.length === 0 && (
        <div className="d-flex justify-content-center align-items-center flex-wrap p-4 m-3 bg-white shadow-sm rounded">
          <div className="lead text-muted">
            <span>No clients to display</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;
