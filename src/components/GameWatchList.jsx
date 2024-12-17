import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const GameWatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Retrieve watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "This game will be removed from your watchlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the game that matches the ID
        const updatedWatchlist = watchlist.filter((game) => game.id !== id);

        // Update the state and localStorage
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

        // Show success message
        Swal.fire(
          "Deleted!",
          "The game has been removed from your watchlist.",
          "success"
        );
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
      <h2 className="text-4xl font-semibold text-center text-blue-700 mb-8">
        Your Watchlist
      </h2>
      {watchlist.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          Your watchlist is empty. Add some games!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Genre</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((game) => (
                <tr key={game.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-800 font-medium">
                    {game.title}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{game.genre}</td>
                  <td className="px-4 py-2 text-gray-600">{game.rating}</td>
                  <td className="px-4 py-2 text-gray-600">{game.year}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(game.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GameWatchList;
