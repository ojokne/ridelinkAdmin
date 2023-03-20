import { signOut } from "firebase/auth";
import {
  FaCheck,
  FaClock,
  FaShoppingCart,
  FaSignOutAlt,
  FaTasks,
  FaTruckLoading,
  FaTruckMoving,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

const MobileMenu = ({ handleShowMenu }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="py-1">
      <ul className="p1 m-1 list-unstyled">
        <Link
          className="text-decoration-none"
          to="/"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Dashboard</span>
            <span>
              <FaTasks className="icon iconMenu" />
            </span>
          </li>
        </Link>
        <Link
          className="text-decoration-none"
          to="pending"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Pending Orders</span>
            <span>
              <FaClock
                className="icon iconMenu"
                style={{ backgroundColor: "#ffc107" }}
              />
            </span>
          </li>
        </Link>
        <Link
          className="text-decoration-none"
          to="trip"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">On Trip</span>
            <span>
              <FaTruckMoving
                className="icon iconMenu"
                style={{ backgroundColor: "#ffc107" }}
              />
            </span>
          </li>
        </Link>
        <Link
          className="text-decoration-none"
          to="delivered"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Delivered Orders</span>
            <span>
              <FaCheck className="icon iconMenu" />
            </span>
          </li>
        </Link>
        {/* <li className="py-2 border-bottom d-flex justify-content-between align-items-center">
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
              <Link
                className="text-decoration-none"
                to="pending"
                onClick={() => handleShowMenu()}
              >
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
              <Link
                className="text-decoration-none"
                to="confirmed"
                onClick={() => handleShowMenu()}
              >
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
        </li> */}

        {/* <Link
          className="text-decoration-none"
          to="clients"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Clients</span>
            <span>
              <FaUser className="icon iconMenu" />
            </span>
          </li>
        </Link> */}
        {/* <Link
          className="text-decoration-none"
          to="drivers"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Drivers</span>
            <span>
              <FaUser className="icon iconMenu" />
            </span>
          </li>
        </Link> */}

        {/* <Link
          className="text-decoration-none"
          to="trucks"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Trucks</span>
            <span>
              <FaTruckLoading className="icon iconMenu" />
            </span>
          </li>
        </Link> */}
        {/* <Link
          className="text-decoration-none"
          to="truck_owners"
          onClick={() => handleShowMenu()}
        >
          <li className="py-2 border-bottom d-flex align-items-center liMenu d-flex justify-content-between align-items-center">
            <span className="text-muted">Truck Owners</span>
            <span>
              <FaUser className="icon iconMenu" />
            </span>
          </li>
        </Link> */}
        <li
          className="py-2 d-flex align-items-center liMenu d-flex justify-content-between align-items-center"
          onClick={(e) => {
            handleShowMenu();
            handleLogout(e);
          }}
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
