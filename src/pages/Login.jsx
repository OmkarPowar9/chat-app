import Input from "../components/global/Input";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { currentUser, userLogin } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await userLogin(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/");
    }
  }, []);

  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo"> Aur Batao </span>
        <span className="title">Login</span>

        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="sample@example.com"
            value={email}
            setValue={setEmail}
          />

          <Input
            type="password"
            placeholder="*******"
            value={password}
            setValue={setPassword}
          />

          <button type="submit"> Sign In </button>
        </form>

        <p>
          Don&apos;t have an account? <Link to="/register"> Register </Link>{" "}
        </p>
      </div>
    </section>
  );
}

export default Login;
