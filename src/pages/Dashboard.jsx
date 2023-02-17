// import { useState } from "react";
// import Loader from "../components/Loader";
import useAuth from "../utils/useAuth";

const Dashboard = () => {
  useAuth();
  // const [loading, setLoading] = useState(true);
  // if (loading) {
  //   return <Loader loading={loading} description="Loading" />;
  // }

  return (
    <div className="mx-auto" style={{ maxWidth: "600px" }}>
      <h1>admin Dashboard</h1>
    </div>
  );
};

export default Dashboard;
