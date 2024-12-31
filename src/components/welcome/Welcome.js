import React from "react";
import { auth } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = auth.currentUser;

  return (
    <div className="welcome">
      <h1>Welcome {user?.displayName}</h1>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block text-center mx-auto my-2"
      >
        Home
      </Link>
    </div>
  );
};

export default Welcome;
