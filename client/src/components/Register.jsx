import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        throw new Error("Registration failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login__container">
      <h2 className="login-header" >Register</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="user-name"
          type="text"
          name="user_name"
          placeholder="Username"
          value={user.user_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Register" />
      </form>
      <p className="dont-have-account">
        Already have an account? ≫ <Link to="/login" className="dont-have-account">Login</Link>
      </p>
    </div>
  );
};

export default Register;
