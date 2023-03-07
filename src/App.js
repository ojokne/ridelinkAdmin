import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Driver from "./components/Driver";
import Client from "./components/Client";
import Truck from "./components/Truck";
import TruckOwner from "./components/TruckOwner";
import Pending from "./components/Pending";
import Confirmed from "./components/Confirmed";
import Confirm from "./components/Confirm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="pending" element={<Pending />} />
          <Route path="confirmed" element={<Confirmed />} />
          <Route path="clients" element={<Client />} />
          <Route path="drivers" element={<Driver />} />
          <Route path="trucks" element={<Truck />} />
          <Route path="truck_owners" element={<TruckOwner />} />
          <Route path="confirm" element={<Confirm />} />
        </Route>
        <Route path="*" element={<p>Error page</p>} />
      </Routes>
    </div>
  );
}

export default App;
