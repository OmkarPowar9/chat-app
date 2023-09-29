import { useState } from "react";
import Input from "../global/Input";
import { findUser } from "../../services/auth";
import { useAuth } from "../../context/authContext";
import { findUserChats } from "../../services/chat";

function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);

  const { currentUser } = useAuth();

  const handleKey = async (event) => {
    setUser(null);
    try {
      if (event.code === "Enter" && userName.length > 0) {
        const resUser = await findUser(userName);
        if (resUser && err) setError(false);
        setUser(resUser);
      }
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      await findUserChats(currentUser?.uid, user, combinedId);
    } catch (error) {
      console.error(error);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="search-form">
        <Input
          type="text"
          placeholder="Find user..."
          value={userName}
          setValue={setUserName}
          onKeyDown={handleKey}
        />
      </div>

      {err && <span> User not found! </span>}
      {user !== null && (
        <div className="user-chat" onClick={handleSelect}>
          <img
            src={
              user?.imgUrl ||
              "https://images.pexels.com/photos/10909252/pexels-photo-10909252.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            }
            alt=""
          />

          <div className="user-chat-info">
            <span>{user?.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
