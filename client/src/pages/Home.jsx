import React from "react";
import { useAuth } from "../contexts/AuthProvider.jsx";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.user_name}</h1>
    </div>
  );
};

export default Home;