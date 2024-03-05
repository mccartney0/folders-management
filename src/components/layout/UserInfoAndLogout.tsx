import { useDispatch } from "react-redux";
import { AppDispatch } from '../../store';
import { logOut } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const UserInfoAndLogOut = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loggedUsername = localStorage.getItem('username');
  const formattedUsername = loggedUsername && loggedUsername[0].toUpperCase() + loggedUsername.slice(1);

  function handleLogOut() {
    dispatch(logOut());
    goToLoginPage();
  }

  const navigate = useNavigate();

  function goToLoginPage() {
    navigate('/login');
  }

  return (
    <div className="wrapper-user-info-and-log-out flex justify user p-3">
      <div className="mr-8">
        Hello, <b>{formattedUsername}</b>
      </div>

      <button
        className="button"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserInfoAndLogOut;