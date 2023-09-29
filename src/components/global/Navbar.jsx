import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (e) {
      console.error(e?.message);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">Aur Batao</span>
      <div className="user">
        <img
          src={
            currentUser?.photoURL ||
            "https://images.pexels.com/photos/10909252/pexels-photo-10909252.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          }
          alt=""
        />
        <span>{currentUser?.displayName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
