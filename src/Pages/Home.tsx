import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/prediction")
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="container ${styles.pageWrapper} text-center mt-5">
      <ImageSlider/>
      {/* Login Card */}
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          {!user ? (
            <button
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "whitesmoke",
                border:"1px solid gray",
                color: "blueviolet",
                fontWeight: "bold",
              }}
              onClick={handleLogin}
            >
              <FcGoogle />
              Sign in with Google
            </button>
          ) : (
            <div style={{borderRadius:"1rem"}}>
              <p>Welcome, {user.displayName}</p>
              <img
                src={user.photoURL}
                alt="user"
                width={50}
                height={50}
                style={{ borderRadius: "50%",marginBottom:"10px" }}
              />
              <br/>
              <button><Link to={'/predictor'} style={{textDecoration:"none",marginTop:"10px",borderRadius:"10px"}}>Predictor Page</Link></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
