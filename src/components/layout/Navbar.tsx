import { Link } from "react-router-dom";
import UserInfoAndLogOut from "./UserInfoAndLogout";

const Navbar = () => {
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  return (
    <nav className="bg-dark text-white">
      <div className="flex justify-between">
        <Link className="p-3" to={'/home'}>
          <span>Folder Management System</span>
        </Link>

        {
          isAuthenticated()
          ? <UserInfoAndLogOut />
          : null
        }
      </div>
    </nav>
  );
};

export default Navbar;