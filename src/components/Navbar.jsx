import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../auth/firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate=useNavigate()
  // const currentUser = { displayName: "Sercan YILMAZ" };
  // const currentUser = false;
  // console.log(currentUser)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand  text-white">
          React Movie App
        </Link>
        <div className="d-flex text-white align-items-center ">
          {currentUser ? (
            <>
              <h5 className="mb-0 text-capitalize">
                {currentUser.displayName}
              </h5>
              <button
                onClick={() => logOut(navigate)}
                className="ms-2 btn btn-outline-light"
              >
                Logout
              </button>
            </>
          ) : (
            <div>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-outline-success me-2  text-white"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline-success  text-white"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
