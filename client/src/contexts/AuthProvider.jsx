import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const res = await fetch("/api/session");
        const user = await res.json();
        if (res.status === 200) {
          setUser(user);
          setIsLoadingUser(false);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    setIsLoadingUser(true);
    loginCheck();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("/api/session", {
        method: "DELETE",
      });
      if (res.status === 200) {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (fields) => {
    setIsLoadingUser(true);
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (res.status === 200) {
        setUser(data.user); 
        setIsLoadingUser(false);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };  

  const register = async (fields) => {
    setIsLoadingUser(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (res.status === 200) {
        setUser(data);
        setIsLoadingUser(false);
        navigate("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
