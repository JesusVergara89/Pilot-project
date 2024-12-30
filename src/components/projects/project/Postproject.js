import React from "react";
import CreatePreInform from "../../forms/CreatePreInform";

const Postproject = ({ info }) => {

  const images = info?.pre_inform?.media?.images || [];

  return (
    <>
    <CreatePreInform id = {info.id}/>
      {images.length > 0 ? (
        images.map((item, index) => (
          <div
            key={index}
            className="max-w-sm rounded-xl bg-slate-400 overflow-hidden shadow-lg"
          >
            <img className="w-full" src={item.image} alt="description" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.element_name}</div>
              <p className="text-gray-700 text-base">{item.description}</p>
              <p className="text-gray-700 text-base">{item.comments}</p>
            </div>
            <div className="w-[80%] mx-auto flex flex-col gap-2 px-6 pt-4 pb-2 text-left">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span className="font-bold text-blue-800">Date:</span>{" "}
                {item.createdAt.toDate().toDateString()}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span className="font-bold text-blue-800">Loader:</span>{" "}
                {item.data_loader}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span className="font-bold text-blue-800">Location:</span>{" "}
                {item.location}
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
