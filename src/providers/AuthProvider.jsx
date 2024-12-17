import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.confiq";

export const AuthContext = createContext(null);

// Google provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create a password-based account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in a user with an email address and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Get the currently signed-in user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      //   console.log("current User", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // signOut users
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // sign-in with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
