import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, provider } from "../firebase";
const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "0.5rem 1rem",
        backgroundColor: "gray",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src={Logo}
          style={{ width: "200px", borderRadius: "50%" }}
          alt="logo"
        />
      </div>
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Home
        </Link>
      </div>
      <div>
        {user ? (
          <div style={{display:"flex",gap:"2rem"}}>
            <Link
              to={"/predictor"}
              style={{marginRight:"10px" ,textDecoration: "none",fontWeight:"bold",fontSize:"1.2rem", color: "whitesmoke" }}
            >
              Predictor Page
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                backgroundColor: "whitesmoke",
                color: "black",
                fontSize:"1.1rem",
                fontWeight:"bold",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            style={{
              textDecoration: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#222",
              backgroundColor: "whitesmoke",
              padding: "6px 12px",
              borderRadius: "5px",
            }}
            onClick={handleLogin}
          >
            Sign-in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
