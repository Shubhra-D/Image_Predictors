import  {  useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

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
      <h2 className="mb-5" style={{fontWeight:"bold"}}>🎨 Welcome to AI Whiteboard</h2>
      {/* Login Card */}
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title">Get Started</h5>
          {!user ? (
            <button className="btn btn-primary w-100" style={{backgroundColor:"whitesmoke", border:"gray.300",color:"blueviolet", fontWeight:"bold" }} onClick={handleLogin}>
              <FcGoogle/>Sign in with Google
            </button>
          ) : (
            <div>
              <p>Welcome, {user.displayName}</p>
              <img src={user.photoURL} alt="user" width={50} height={50} style={{ borderRadius: "50%" }} />
            </div>
          )}
        </div>
      </div>
      
      </div>

      
    
  );
};

export default Home;
