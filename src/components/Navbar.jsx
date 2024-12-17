import { useContext } from "react";
import "./Navbar.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out successfully");
        navigate("/");
      })
      .catch((error) => console.log("ERROR", error.message));
  };

  const links = (
    <>
      <li>
        <NavLink to="/" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/signin" activeClassName="active">
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" activeClassName="active">
          Sign Up
        </NavLink>
      </li>

      <li>
        <NavLink to="/about-us" activeClassName="active">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" activeClassName="active">
          Contact Us
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/reviews" activeClassName="active">
              All Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/addReview" activeClassName="active">
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/myReviews" activeClassName="active">
              My Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="/watchlist" activeClassName="active">
              Game WatchList
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 shadow-lg py-4">
      <div className="navbar max-w-7xl mx-auto text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-purple-800 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
            >
              {links}
            </ul>
          </div>
          <Link className="flex items-center mr-2" to="/">
            <img
              className="w-12 h-12 rounded-full border-2 border-yellow-400"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1G-CA4kQE-UdzD2g2ByBDMW_7xEoxdtbHogO7DhlPgW818GhqzaI_ls3cr7CUfutlmxI&usqp=CAU"
              alt="Chill Gamer Logo"
            />
            <span className="ml-2 text-xl font-semibold text-yellow-300">
              Chill Gamer
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1">{links}</ul>
        </div>

        <div className="navbar-end space-x-5">
          {user ? (
            <>
              {/* Profile Image with Tooltip */}
              <div className="relative group">
                <img
                  className="w-10 h-10 rounded-full ring-yellow-400 ring-2 cursor-pointer"
                  src={user?.photoURL}
                  alt="user-avatar"
                />
                {/* Tooltip with displayName */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 bg-gray-800 text-white text-sm font-semibold rounded py-1 px-2 hidden group-hover:block transition-opacity duration-300 opacity-100">
                  {user.displayName}
                </div>
              </div>

              <a
                onClick={handleSignOut}
                className="btn bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-semibold px-4 py-2 rounded"
              >
                Sign Out
              </a>
            </>
          ) : (
            <Link
              to="/signin"
              className="btn bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-semibold px-4 py-2 rounded"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
