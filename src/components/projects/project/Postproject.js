import React from "react";

const Postproject = ({ info }) => {
  // Verificar si las imágenes existen
  const images = info?.pre_inform?.media?.images || [];

  return (
    <>
      {images.length > 0 ? (
        images.map((item, index) => (
          <div key={index} className="max-w-sm rounded bg-slate-400 overflow-hidden shadow-lg">
            <img
              className="w-full"
              src={item.image}
              alt="description"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {item.element_name}
              </div>
              <p className="text-gray-700 text-base">
                {item.description}
              </p>
              <p className="text-gray-700 text-base">
                {item.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #travel
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #winter
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No images available to display.</p>
      )}
    </>
  );
};

export default Postproject;
