import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateReview = () => {
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
    coverImage,
  } = game;

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedGame = {
      email: form.email.value,
      name: form.name.value,
      title: form.title.value,
      description: form.description.value,
      rating: form.rating.value,
      year: form.year.value,
      genre: form.genre.value,
      coverImage: form.coverImage.value,
    };

    fetch(`https://game-review-app-server.vercel.app/chillGamer/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGame),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Game updated successfully.",
            icon: "success",
            confirmButtonText: "Cool",
          }).then(() => navigate("/myReviews"));
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-4xl font-semibold text-center text-blue-700 mb-6">
        Update Your Review
      </h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            readOnly
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            readOnly
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Game Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            placeholder="Enter game title"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Review Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
            placeholder="Write your review"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label
            htmlFor="rating"
            className="block text-lg font-medium text-gray-700"
          >
            Rating (1-10)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            defaultValue={rating}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-lg font-medium text-gray-700"
          >
            Release Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            defaultValue={year}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label
            htmlFor="genre"
            className="block text-lg font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            defaultValue={genre}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
          </select>
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-lg font-medium text-gray-700"
          >
            Cover Image URL
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            defaultValue={coverImage}
            placeholder="Enter image URL"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReview;
