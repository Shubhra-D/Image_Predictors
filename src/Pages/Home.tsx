import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";

const Home = () => {
  const [user, setUser] = useState(null);
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="container ${styles.pageWrapper} text-center mt-5">
      {/* Login Card */}
      <div
        className="card mx-auto"
        style={{ maxWidth: "400px", margin: "10px",backgroundColor:"whitesmoke" }}
      >
        <div className="card-body">
          {!user ? (
            <button
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "whitesmoke",
                border: "1px solid gray",
                color: "blueviolet",
                fontWeight: "bold",
              }}
              onClick={handleLogin}
            >
              <FcGoogle />
              Sign in with Google
            </button>
          ) : (
            <div
              style={{
                borderRadius: "1rem",
                boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              <p>Welcome, {user.displayName}</p>
              <img
                src={user.photoURL}
                alt="user"
                width={50}
                height={50}
                style={{ borderRadius: "50%", marginBottom: "10px" }}
              />
              <br />
              <h6 style={{color:"gray",padding:"10px"}}>Wanna Explore your Image being Predicted</h6>

              <button
                style={{
                  borderRadius: "10px",
                  border: "none",
                  padding:"8px",
                  fontWeight: "bold",
                  backgroundColor: "black",
                  color: "whitesmoke",
                }}
              >
                <Link
                  to={"/predictor"}
                  style={{ textDecoration: "none", marginTop: "10px",color:"whitesmoke" }}
                >
                  Predictor Page
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>

      <ImageSlider />
    </div>
  );
};

export default Home;
