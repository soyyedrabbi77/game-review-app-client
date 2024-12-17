import Swal from "sweetalert2";

const AddReview = () => {
  const handleSubmit = (event) => {
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

    const newGame = {
      email,
      name,
      title,
      description,
      rating,
      year,
      genre,
      coverImage,
    };
    console.log(newGame);

    // Send data to the server
    fetch("https://game-review-app-server.vercel.app/chillGamer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newGame),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Review Added Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          }).then(() => {
            // Reset the form fields after success
            form.reset();
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add review",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Submit Your Review
        </h2>
        <form onSubmit={handleSubmit}>
          {/* User Email (Read-Only) */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value="rabbinyc300@gmail.com"
              readOnly
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>

          {/* User Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value="SM.Rabbi"
              readOnly
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>

          {/* Game Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold"
            >
              Game Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter game title"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold"
            >
              Review Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Write your review"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label
              htmlFor="rating"
              className="block text-gray-700 font-semibold"
            >
              Rating (1-10)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="10"
              placeholder="Rate the game"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Release Year */}
          <div className="mb-6">
            <label htmlFor="year" className="block text-gray-700 font-semibold">
              Release Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Enter release year"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Genre */}
          <div className="mb-6">
            <label
              htmlFor="genre"
              className="block text-gray-700 font-semibold"
            >
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <div className="mb-6">
            <label
              htmlFor="coverImage"
              className="block text-gray-700 font-semibold"
            >
              Cover Image URL
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              placeholder="Enter image URL"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-lg"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
