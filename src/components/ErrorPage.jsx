import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 px-6">
      {/* Error Text */}
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-300 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Go Back Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-all"
      >
        Go Back to Home
      </Link>

      {/* Additional Details */}
      <div className="mt-10 text-gray-400">
        <p>
          Need help?{" "}
          <Link to="/contact" className="text-purple-400 hover:underline">
            Contact Us
          </Link>
        </p>
        <p className="mt-2">
          Or explore our{" "}
          <Link to="/all-review" className="text-purple-400 hover:underline">
            Game Reviews
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
