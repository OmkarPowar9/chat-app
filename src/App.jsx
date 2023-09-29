import { Route, Routes, useLocation } from "react-router-dom";
import Paths from "./Routes";
import "./styles.scss";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./context/authContext";

function App() {
  const { currentUser: user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {user === null ? (
        location.pathname === "/register" ? (
          <Register />
        ) : (
          <Login />
        )
      ) : (
        <Routes>
          {Paths.map(({ path, component: Component }, index) => {
            return <Route path={path} key={index} element={<Component />} />;
          })}
        </Routes>
      )}
    </>
  );
}

export default App;
