import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import AllReviews from "./components/AllReviews";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthProvider from "./providers/AuthProvider";
import AddReview from "./components/AddReview";
import PrivateRoute from "./routes/PrivateRoute";
import MyReview from "./components/MyReview";
import GameWatchList from "./components/GameWatchList";
import ErrorPage from "./components/ErrorPage";
import UpdateReview from "./components/UpdateReview";
import UpdateGame from "./components/UpdateGame";
import ReviewDetails from "./components/ReviewDetails";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch("https://game-review-app-server.vercel.app/chillGamer"),
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/reviews",
        element: <AllReviews></AllReviews>,
      },
      {
        path: "/reviews/:id", // Route for individual review details
        element: <ReviewDetails></ReviewDetails>,
        loader: async ({ params }) => {
          const response = await fetch("/games.json"); // Fetch the entire JSON file
          if (!response.ok) {
            throw new Error("Failed to fetch game data.");
          }
          const games = await response.json(); // Parse the JSON
          const game = games.find((game) => game.id.toString() === params.id); // Find the game by ID
          if (!game) {
            throw new Error("Game not found.");
          }
          return game; // Return the specific game
        },
      },
      {
        path: "/review",
        element: <ReviewDetails></ReviewDetails>,
      },
      {
        path: "/review/:id",
        element: <ReviewDetails></ReviewDetails>,
      },
      {
        path: "/addReview",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/myReviews",
        element: (
          <PrivateRoute>
            <MyReview></MyReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <PrivateRoute>
            <GameWatchList></GameWatchList>
          </PrivateRoute>
        ),
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/update/:id",
        element: <UpdateGame></UpdateGame>,
        loader: ({ params }) =>
          fetch(
            `https://game-review-app-server.vercel.app/chillGamer/${params.id}`
          ),
      },
      {
        path: "/updateReview/:id",
        element: <UpdateReview></UpdateReview>,
        loader: ({ params }) =>
          fetch(
            `https://game-review-app-server.vercel.app/chillGamer/${params.id}`
          ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
