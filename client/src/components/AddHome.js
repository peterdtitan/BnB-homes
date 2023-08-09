import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHome } from '../redux/homesSlice';

const AddHome = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
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
      // Wrap the form data under the "home" key
      const homeData = { home: formData };

      // Dispatch the addHome action with the wrapped form data
      await dispatch(addHome(homeData));

      // Clear the form after successfully adding the home
      setFormData({
        name: '',
        price: '',
        image: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding home:', error);
      // Handle error if necessary
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-evenly px-10 -mt-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-widest">ADD A NEW HOME</h1>
        <p className="italic font-thin text-md mt-2">We are glad to have you list with us!</p>
      </div>
      <div className="w-[80%] bg-white py-4 px-4 shadow-md rounded-md border-[0.5px]">
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-[0.5px] border-gray-300 rounded-md"
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 border-[0.5px] p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 border-[0.5px] p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 border-[0.5px] p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHome;
