import React from "react";
import { Link } from "react-router-dom";

const Project = ({ item }) => {
  return (
    <Link
      to={`/projectinfo/${item.id}`}
      className="max-w-sm hover:bg-slate-100 hover:cursor-pointer rounded bg-slate-400 overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.company}</div>
        <p className="text-gray-900 text-base">{item.description}</p>
      </div>
      <div className="flex flex-col gap-2 px-6 pt-4 pb-2 text-left text-center">
        <span className="inline-block border border-gray-700 p-4 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          OTE: {item.identification}
        </span>
        <span className="inline-block border border-gray-700 p-4 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Date: {item.createdAt.toDate().toDateString()}
        </span>
      </div>
    </Link>
  );
};

export default Project;
