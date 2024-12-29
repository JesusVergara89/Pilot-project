import React from "react";
import { Link } from "react-router-dom";

const Project = ({ item }) => {
  return (
    <Link
      to={`/projectinfo/${item.id}`}
      className="max-w-sm w-[250px] h-[320px] hover:bg-slate-100 hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-transform duration-300 rounded bg-slate-400 overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 truncate">{item.company}</div>
        <p className="text-gray-900 text-base line-clamp-3">
          {item.description}
        </p>
      </div>
      <div className="flex flex-col gap-2 px-6 pt-4 pb-2 text-left">
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          OTE: {item.identification}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Date: {item.createdAt.toDate().toDateString()}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Created by: {item.userName}
        </span>
      </div>
    </Link>
  );
};

export default Project;
