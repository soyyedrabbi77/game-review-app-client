
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [success, setSuccess] = useState(false);
  const [signInError, setSignInError] = useState("");

  const emailRef = useRef();
  const navigate = useNavigate();

  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      setSignInError("Please provide a valid email address.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password Reset email sent. Please check your email.");
        setSignInError("");
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setSignInError(error.message);
      });
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        setSignInError("");
        event.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setSignInError(error.message);
        setSuccess(false);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        setSignInError("");
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setSignInError(error.message);
        setSuccess(false);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "20px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome Back!</h1>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>Sign in to access your favorite games, manage reviews, and explore the latest updates.</p>

        {/* Google Sign In Button */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={handleGoogleSignIn}
            style={{
              backgroundColor: "#4285F4",
              color: "white",
              padding: "10px 20px",
              borderRadius: "4px",
              width: "100%",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            Sign In with Google
          </button>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px",
                outline: "none",
              }}
            />
            <a
              onClick={handleForgetPassword}
              style={{
                display: "block",
                marginTop: "10px",
                color: "#007BFF",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </a>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Success Message */}
        {success && <p style={{ color: "green", textAlign: "center" }}>User signed in successfully.</p>}

        {/* Error Message */}
        {signInError && <p style={{ color: "red", textAlign: "center" }}>{signInError}</p>}

        {/* Sign Up Redirect */}
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          New to this website?{" "}
          <Link to="/signup" style={{ color: "#007BFF", textDecoration: "none" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
