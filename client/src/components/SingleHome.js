import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SingleHome() {
  const { homeId } = useParams();
  const singleHome = useSelector((state) => state.homes.singleHome);

  // Assuming the singleHome object contains the data you want to display
  const { name, price, image, description } = singleHome || {};

  return (
    <div className="flex items-center justify-center h-screen">
      {singleHome ? (
        <div className="w-96 h-96 mx-auto rounded-lg overflow-hidden shadow-md">
          <img src={image} alt="Home" className="w-full h-60 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-lg font-medium text-gray-700">Price: ${price}</p>
            <p className="text-gray-600 mt-4">{description}</p>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Loading...</p>
      )}
    </div>
  );
}
