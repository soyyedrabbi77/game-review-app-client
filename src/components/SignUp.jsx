import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.confiq";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { createUser } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const terms = event.target.terms.checked;

    if (!terms) {
      setErrorMessage("Please accept our terms and conditions.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must include at least one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        // Update the user's profile
        return updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log("User profile updated successfully");

            // Update the context state
            const updatedUser = { ...user, displayName: name, photoURL: photo };
            setSuccess(true);
            setErrorMessage("");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error updating profile:", error.message);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center px-4 py-10">
      <div className="card bg-white w-full max-w-md shadow-2xl rounded-lg p-6">
        {/* Form Header */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create Your Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name Input */}
          <div className="form-control">
            <label className="label font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="input input-bordered border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control relative">
            <label className="label font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              className="input input-bordered border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-14 text-gray-600 hover:text-indigo-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Photo URL Input */}
          <div className="form-control">
            <label className="label font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="form-control">
            <label className="label flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                name="terms"
              />
              <span className="text-gray-700">
                I accept the{" "}
                <a href="#" className="text-indigo-500 underline">
                  Terms and Conditions
                </a>
                .
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-lg shadow-md"
          >
            Sign Up or Register
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-center font-semibold mt-4">
            {errorMessage}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-center font-semibold mt-4">
            Sign Up Successful!
          </p>
        )}

        {/* Sign In Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
