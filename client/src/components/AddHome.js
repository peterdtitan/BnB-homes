import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHome } from "../redux/homesSlice";

const AddHome = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    address: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the addHome action with the form data
      await dispatch(addHome(formData));
      // Clear the form after successfully adding the home
      setFormData({
        address: "",
        price: "",
        image: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding home:", error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      <h2>Add a New Home</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Home</button>
      </form>
    </div>
  );
};

export default AddHome;
