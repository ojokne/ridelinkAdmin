import {
  FaCheck,
  FaClock,
  FaShoppingCart,
  FaSignOutAlt,
  FaTasks,
  FaTruckLoading,
  FaUser,
} from "react-icons/fa";
import { useAuthentication } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ACTIONS } from "../context/actions";

const MobileMenu = () => {
  const navigate = useNavigate();

  const { authDispatch } = useAuthentication();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      const data = await res.json();
      if (data.isLoggedOut) {
        authDispatch({ type: ACTIONS.LOGOUT });
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="py-1">
      <ul className="p1 m-1 list-unstyled">
        <Link className="text-decoration-none" to="/">
          <li className="py-2 border-bottom liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Dashboard</span>
            <span>
              <FaTasks className="icon iconMenu" />
            </span>
          </li>
        </Link>
        <li className="py-2 border-bottom d-flex justify-content-between align-items-center">
          <div className="dropdown">
            <button
              className=" btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="orders"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Orders
            </button>
            <ul className="dropdown-menu" aria-labelledby="orders">
              <Link className="text-decoration-none" to="pending">
                <li className="p-2 border-bottom d-flex align-items-center liMenu">
                  <span>
                    <FaClock
                      className="iconSmall"
                      style={{ backgroundColor: "#ffc107" }}
                    />
                  </span>
                  <span className="text-muted px-2">Pending</span>
                </li>
              </Link>
              <Link className="text-decoration-none" to="confirmed">
                <li className="p-2 d-flex align-items-center liMenu">
                  <span>
                    <FaCheck className="iconSmall" />
                  </span>
                  <span className="text-muted px-2">Confirmed</span>
                </li>
              </Link>
            </ul>
          </div>
          <span>
            <FaShoppingCart className="icon iconMenu" />
          </span>
        </li>

        <Link className="text-decoration-none" to="clients">
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Clients</span>
            <span>
              <FaUser className="icon iconMenu" />
            </span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="drivers">
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Drivers</span>
            <span>
              <FaUser className="icon iconMenu" />
            </span>
          </li>
        </Link>

        <Link className="text-decoration-none" to="trucks">
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Trucks</span>
            <span>
              <FaTruckLoading className="icon iconMenu" />
            </span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="truck_owners">
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Truck Owners</span>
            <span>
              <FaUser className="icon iconMenu" />
            </span>
          </li>
        </Link>
        <li
          className="py-2 d-flex align-items-center liMenu d-flex justify-content-between align-items-center"
          onClick={(e) => handleLogout(e)}
        >
          <span className="text-muted">Logout</span>
          <span>
            <FaSignOutAlt className="icon iconMenu" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
