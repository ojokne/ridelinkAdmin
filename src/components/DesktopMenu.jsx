import { FaCheck, FaClock, FaTasks, FaTruckMoving } from "react-icons/fa";
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
        <Link className="text-decoration-none" to="pending">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaClock
                className="icon iconMenu"
                style={{ backgroundColor: "#ffc107" }}
              />
            </span>
            <span className="text-muted">Pending Orders</span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="trip">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaTruckMoving
                className="icon iconMenu"
                style={{ backgroundColor: "#ffc107" }}
              />
            </span>
            <span className="text-muted">On Trip</span>
          </li>
        </Link>
        <Link className="text-decoration-none" to="delivered">
          <li className="py-2 border-bottom liMenu">
            <span>
              <FaCheck className="icon iconMenu" />
            </span>
            <span className="text-muted">Delivered</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default DesktopMenu;
