import React, { useState } from "react";
import CreatePreInform from "../../forms/CreatePreInform";
import CreatePostInform from "../../forms/CreatePostInform";

const Postproject = ({ info }) => {
  const [showPost, setShowPost] = useState(false);
  const [showPre, setShowPre] = useState(true); // Mostrar Pre Info inicialmente

  const images_post = info?.post_inform?.media?.images || [];
  const images_pre = info?.pre_inform?.media?.images || [];

  const handleShowPost = () => {
    setShowPost(true);
    setShowPre(false);
  };

  const handleShowPre = () => {
    setShowPre(true);
    setShowPost(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleShowPre}
          className={`px-4 py-2 rounded ${
            showPre ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Show Pre Info
        </button>
        <button
          onClick={handleShowPost}
          className={`px-4 py-2 rounded ${
            showPost ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Show Post Info
        </button>
      </div>

      {showPre && (
        <div className="w-full">
          <div className="mb-6">
            <CreatePreInform id={info.id} />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {images_pre.length > 0 ? (
              images_pre.map((item, index) => (
                <div
                  key={index}
                  className="max-w-sm rounded-xl bg-slate-400 overflow-hidden shadow-lg"
                >
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
                      <span className="font-bold text-blue-800">
                        Location:
                      </span>{" "}
                      {item.location}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No images available to display.</p>
            )}
          </div>
        </div>
      )}

      {showPost && (
        <div className="w-full">
          <div className="mb-6">
            <CreatePostInform id={info.id} />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {images_post.length > 0 ? (
              images_post.map((item, index) => (
                <div
                  key={index}
                  className="max-w-sm rounded-xl bg-slate-400 overflow-hidden shadow-lg"
                >
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
                      <span className="font-bold text-blue-800">
                        Location:
                      </span>{" "}
                      {item.location}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No images available to display.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Postproject;
