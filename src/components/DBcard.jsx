import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const DBcard = ({ game, setGames, games }) => {
  const {
    _id,
    email,
    name,
    title,
    description,
    rating,
    year,
    genre,
    review,
    coverImage,
  } = game;

  //  Handle Delete
  const handleDelete = (_id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://game-review-app-server.vercel.app/chillGamer/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remaining = games.filter((gam) => gam._id !== _id);
              setGames(remaining);
            }
          });
      }
    });
  };

  return (
    <div
      key={game._id}
      className="card bg-base-100 shadow-xl p-4 border rounded-md"
    >
      <img
        src={coverImage}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Title: {title}</h2>
      <p className="text-gray-600">
        <span className="font-bold">Genre:</span> {genre}
      </p>
      <p className="text-gray-600">
        <span className="font-bold">Rating:</span> ({rating}/10)
      </p>
      <p className="text-gray-600 mt-2">{review}</p>
    </div>
  );
};

export default DBcard;
