import React, { useState } from "react";
import CreatePreInform from "../../forms/CreatePreInform";
import CreatePostInform from "../../forms/CreatePostInform";

const PrePosInform = ({ info }) => {
  const [showPost, setShowPost] = useState(false);
  const [showPre, setShowPre] = useState(true);

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

  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'imagen.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderImageCard = (images) => {
    return images.length > 0 ? (
      images.map((item, index) => (
        <div
          key={index}
          className="max-w-sm relative rounded-xl bg-slate-400 overflow-hidden shadow-lg"
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
          <div className="flex justify-center mt-4">
            <button
              onClick={() => downloadImage(item.image)}
              className="px-4 absolute top-0 right-0 py-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors"
            >
              Expand Imagen
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No images available to display.</p>
    );
  };

  return (
    <div className="flex mt-8 flex-col items-center gap-6">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleShowPre}
          className={`px-4 py-2 rounded ${
            showPre ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Levantamientos
        </button>
        <button
          onClick={handleShowPost}
          className={`px-4 py-2 rounded ${
            showPost ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          Mantenimientos
        </button>
      </div>

      {showPre && (
        <div className="w-full">
          <div className="mb-6">
            <CreatePreInform id={info.id} info={info} />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {renderImageCard(images_pre)}
          </div>
        </div>
      )}

      {showPost && (
        <div className="w-full">
          <div className="mb-6">
            <CreatePostInform id={info.id} info={info}  />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {renderImageCard(images_post)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrePosInform;
