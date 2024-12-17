import React, { useState } from "react";
import games from "../../public/games.json";
import { useNavigate } from "react-router-dom";

const AllReviews = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const navigate = useNavigate();

  // Filter by rating or year
  const filteredGames = games.filter((game) =>
    filter === "highRating"
      ? game.rating >= 9
      : filter === "lowRating"
      ? game.rating < 9
      : true
  );

  // Sort the filtered games
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "year") return b.year - a.year;
    return 0;
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
          All Reviews
        </h1>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap justify-between items-center bg-white shadow-md rounded-lg p-4 mb-8">
          {/* Filter */}
          <div className="flex items-center mb-2 sm:mb-0">
            <label className="font-medium text-gray-700 mr-2">Filter:</label>
            <select
              className="select select-bordered border-gray-300 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="highRating">High Rating (9+)</option>
              <option value="lowRating">Low Rating (Below 9)</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center">
            <label className="font-medium text-gray-700 mr-2">Sort by:</label>
            <select
              className="select select-bordered border-gray-300 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="rating">Rating</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedGames.map((game) => (
            <div
              key={game.id}
              className="card bg-white shadow-lg p-6 border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Image */}
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {/* Title */}
              <h2 className="text-xl font-bold text-indigo-700 mb-2">
                {game.title}
              </h2>
              {/* Details */}
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Genre:</span> {game.genre}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Rating:</span> {game.rating}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Year:</span> {game.year}
              </p>
              <p className="text-gray-600 mt-4">{game.review}</p>
              {/* Button */}
              <button
                className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-4"
                onClick={() => navigate(`/reviews/${game.id}`)}
              >
                Explore Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
