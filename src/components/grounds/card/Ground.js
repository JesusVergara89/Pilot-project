import React from "react";
import { Link } from "react-router-dom";

const Ground = ({ item }) => {
  return (
    <Link
      to={`/groundinfo/${item.id}`}
      className="max-w-sm w-[250px] h-[400px] hover:bg-slate-100 hover:scale-105 hover:shadow-lg hover:cursor-pointer transition-transform duration-300 rounded bg-slate-400 overflow-hidden shadow-lg"
    >
      <div className="flex flex-col gap-2 px-6 pt-4 pb-2 text-left">
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Cliente: {item.client}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          OT: {item.ot}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Planta: {item.plant}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Equipo: {item.equipment}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Marca: {item.brand}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Modelo: {item.model}
        </span>
        <span className="inline-block border border-gray-700 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Serie: {item.serie}
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

export default Ground;
