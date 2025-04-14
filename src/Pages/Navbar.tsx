import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useEffect, useState } from "react";
import { onAuthStateChanged,signOut,User } from "firebase/auth";
import { auth } from "../firebase";
const Navbar = () => {
  const [user,setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
    })
    return ()=>unsubscribe();
},[]);
 
const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

    return (
    <div style={{ display: "flex",padding: "0.5rem 1rem",backgroundColor:"gray", justifyContent: "space-between",alignItems:"center" }}>
      <div>
        <img
          src={Logo}
          style={{ width: "200px", borderRadius: "50%" }}
          alt="logo"
        />
      </div>
      <div>
        <Link to="/" style={{ textDecoration: "none",fontSize:"1.2rem",fontWeight:"bold",color:"black" }}>
          Home
        </Link>
      </div>
      <div>
      {user ? (
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                backgroundColor: "#222",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              fontSize: "1.1rem",
              color: "white",
              backgroundColor: "#222",
              padding: "6px 12px",
              borderRadius: "5px",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
