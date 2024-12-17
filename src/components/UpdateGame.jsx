import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateGame = () => {
  const navigate = useNavigate();

  const game = useLoaderData();
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

  const handleUpdate = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value; // Use authenticated user's email
    const name = form.name.value; // User-entered name
    const title = form.title.value;
    const description = form.description.value;
    const rating = form.rating.value;
    const year = form.year.value;
    const genre = form.genre.value;
    const coverImage = form.coverImage.value;

    const updatedGame = {
      email,
      name,
      title,
      description,
      rating,
      year,
      genre,
      coverImage,
    };
    console.log(updatedGame);

    // send data to the server
    fetch(`https://game-review-app-server.vercel.app/chillGamer/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedGame),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Game Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          }).then(() => {
            // Navigate to home after success alert
            navigate("/");
          });
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Update Your Review : {title}
      </h2>

      <form onSubmit={handleUpdate}>
        {/* User Email (Read-Only) */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            readOnly
          />
        </div>

        {/* Game Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Game Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            placeholder="Enter game title"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Review Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
            placeholder="Write your review"
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700">
            Rating (1-10)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            defaultValue={rating}
            placeholder="Rate the game"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Release Year */}
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700">
            Release Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            defaultValue={year}
            placeholder="Enter release year"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Genre */}
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            defaultValue={genre}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
          </select>
        </div>

        {/* Cover Image URL */}
        <div className="mb-4">
          <label htmlFor="coverImage" className="block text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            defaultValue={coverImage}
            placeholder="Enter image URL"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGame;
