import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyReview = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the server
  useEffect(() => {
    fetch("https://game-review-app-server.vercel.app/chillGamer")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Delete review
  const handleDelete = (id) => {
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
        fetch(`https://game-review-app-server.vercel.app/chillGamer/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your review has been deleted.", "success");

              // Remove the deleted review from the list
              const remainingReviews = reviews.filter(
                (review) => review._id !== id
              );
              setReviews(remainingReviews);
            }
          })
          .catch((error) => console.error("Error deleting review:", error));
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center">
        My Reviews ({reviews.length})
      </h2>
      {reviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Cover
                </th>
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Title
                </th>
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Genre
                </th>
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Rating
                </th>
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Year
                </th>
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Reviewer
                </th>
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="border px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-3">
                    <img
                      src={review.coverImage}
                      alt={review.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {review.title}
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {review.genre}
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {review.rating}/10
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {review.year}
                  </td>
                  <td className="border px-4 py-3 text-gray-800">
                    {review.name}
                  </td>
                  <td className="border px-4 py-3 text-gray-800 truncate max-w-xs">
                    {review.description}
                  </td>
                  <td className="border px-4 py-3">
                    <div className="flex space-x-2">
                      <Link to={`/updateReview/${review._id}`}>
                        <button className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700">No reviews found.</p>
      )}
    </div>
  );
};

export default MyReview;
