import {
  FaCheck,
  FaClock,
  FaShoppingCart,
  FaTasks,
  FaTruckLoading,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const DesktopMenu = () => {
  return (
    <div className="p-3 m-3">
      <ul className="p1 m-1 list-unstyled">
        <Link className="text-decoration-none" to="/">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaTasks className="icon iconMenu" />
            </span>
            <span className="text-muted">Dashboard</span>
          </li>
        </Link>
        <li className="py-2 border-bottom d-flex align-items-center">
          <span>
            <FaShoppingCart className="icon iconMenu" />
          </span>
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
        </li>
        <Link className="text-decoration-none" to="clients">
          <li className="py-2 border-bottom d-flex align-items-center liMenu">
            <span>
              <FaUser className="icon iconMenu" />
            </span>
            <span className="text-muted">Clients</span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="drivers">
          <li className="py-2 border-bottom d-flex align-items-center liMenu">
            <span>
              <FaUser className="icon iconMenu" />
            </span>
            <span className="text-muted">Drivers</span>
          </li>
        </Link>

        <Link className="text-decoration-none" to="trucks">
          <li className="py-2 border-bottom d-flex align-items-center liMenu">
            <span>
              <FaTruckLoading className="icon iconMenu" />
            </span>
            <span className="text-muted">Trucks</span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="truck_owners">
          <li className="py-2 border-bottom d-flex align-items-center liMenu">
            <span>
              <FaUser className="icon iconMenu" />
            </span>
            <span className="text-muted">Truck Owners</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default DesktopMenu;
