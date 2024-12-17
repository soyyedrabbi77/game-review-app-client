import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import games from "../../public/games.json";
import { GrPrevious } from "react-icons/gr";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const navigate = useNavigate();

  // Find the game with the matching ID
  const game = games.find((game) => game.id === parseInt(id));

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-bold text-red-500">Game not found!</h2>
      </div>
    );
  }

  const goBack = () => {
    navigate(-1);
  };

  const addToWatchList = () => {
    // Retrieve watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check if the game is already in the watchlist
    if (!storedWatchlist.some((item) => item.id === game.id)) {
      storedWatchlist.push(game);
      localStorage.setItem("watchlist", JSON.stringify(storedWatchlist));

      // Show success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Added to Watchlist!",
        text: `${game.title} has been added to your watchlist.`,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Already in Watchlist",
        text: `${game.title} is already in your watchlist.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="container mx-auto">
        <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-xl mx-auto">
          {/* Go Back Button */}
          <button
            onClick={goBack}
            className="absolute top-4 left-4 px-4 py-2 flex items-center bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:ring-2 focus:ring-purple-400"
          >
            <GrPrevious className="mr-2" />
            Go back
          </button>

          {/* Game Image */}
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-[400px] object-cover rounded-lg mb-6"
          />

          {/* Game Title */}
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center">
            {game.title}
          </h1>

          {/* Game Details */}
          <div className="text-gray-700">
            <p className="mb-3">
              <span className="font-bold">Genre:</span> {game.genre}
            </p>
            <p className="mb-3">
              <span className="font-bold">Rating:</span> {game.rating}
            </p>
            <p className="mb-3">
              <span className="font-bold">Year:</span> {game.year}
            </p>
          </div>

          {/* Review Section */}
          <div className="text-gray-700 mt-6">
            <h2 className="text-2xl font-semibold mb-2">Review:</h2>
            <p className="leading-relaxed">{game.review}</p>
          </div>

          {/* Add to Watchlist Button */}
          <button
            onClick={addToWatchList}
            className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all"
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
