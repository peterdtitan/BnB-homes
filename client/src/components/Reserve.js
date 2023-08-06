import React, { useState } from 'react';
import { useNavigate, useParams  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const cities = ['City A', 'City B', 'City C', 'City D'];

export default function Reserve() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const { homeId } = useParams();
  const homes = useSelector((state) => state.homes.homes);
  const selectedHome = homes.find((home) => home.id === parseInt(homeId));

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation data:', {
      startDate,
      endDate,
      city: selectedCity,
    });
  };

  return (
    <form className="p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 bg-green-200 p-2 rounded-md">Reservation For &nbsp;
        <span className="animate-pulse">{selectedHome.name.toUpperCase()}</span>
      </h2>
      <div className="mb-4">
        <label htmlFor="startDate" className="block font-medium">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block font-medium">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block font-medium">
          Select City
        </label>
        <select
          id="city"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        onClick={handleSubmit}
      >
        Reserve
      </button>
    </form>
  );
}
