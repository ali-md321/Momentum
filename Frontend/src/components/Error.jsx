import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      {/* Sad face emoji or Instagram-style icon */}
      <div className="text-6xl mb-4">😕</div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Sorry, this page isn't available.</h1>

      {/* Description */}
      <p className="text-gray-600 text-sm max-w-sm mb-6">
        The link you followed may be broken, or the page may have been removed.
      </p>

      {/* Redirect Link */}
      <Link
        to="/"
        className="text-blue-500 font-medium text-sm hover:underline"
      >
        Go back to home
      </Link>
    </div>
  );
}

export default Error;
