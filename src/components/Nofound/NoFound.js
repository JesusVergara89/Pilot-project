import React from 'react';

const NoFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center max-w-lg mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          ¡Trabajando...!
        </h1>
        <img
          src="https://media.giphy.com/media/pFwRzOLfuGHok/giphy.gif"
          alt="Trabajando"
          className="w-full max-w-sm mx-auto rounded-lg shadow-lg mb-6"
        />
        <p className="text-lg text-gray-600">
          Esta página esta en MTTO. Por favor, vuelve más tarde.
        </p>
      </div>
    </div>
  );
};

export default NoFound;
