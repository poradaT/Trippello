import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: email,
        password: password,
      };
      await login(formData);
      console.log(formData);

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login__container empty-component">
      <h2 className="login-header">Login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      
      {error && <p className="dont-have-account">{error}</p>}
      <p className="dont-have-account">
        Don't have an account? ≫ <Link to="/register" className="dont-have-account">Register</Link>
      </p>

      </form>
    </div>
  );
};

export default Login;
