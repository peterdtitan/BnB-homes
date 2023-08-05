import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SingleHome() {
  const { homeId } = useParams();
  const singleHome = useSelector((state) => state.homes.singleHome);

  // Assuming the singleHome object contains the data you want to display
  const { name, price, image, description } = singleHome || {};

  return (
    <div>
      {singleHome ? (
        <>
          <h2>{name}</h2>
          <p>Price: {price}</p>
          <img src={image} alt="Home" />
          <p>{description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
