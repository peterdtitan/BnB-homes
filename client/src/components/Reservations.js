import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllReservations,
  deleteReservations,
} from '../redux/ReservationsSlice';

export default function Reservations() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  const homes = useSelector((state) => state.homes.homes); // Assuming you have a homes reducer

  useEffect(() => {
    dispatch(fetchAllReservations());
  }, [dispatch]);

  const handleDelete = (reservationId) => {
    dispatch(deleteReservations(reservationId));
  };

  const getHomeName = (homeId) => {
    const home = homes.find((home) => home.id === homeId);
    return home ? home.name : 'Unknown Home';
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <div className="grid grid-cols-1 gap-4 md:flex md:flex-col">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="w-full md:w-[550px] p-6 bg-white rounded-md shadow-md flex flex-col justify-between gap-4 md:flex-row md:items-center"
          >
            <div className="md:flex-grow">
              <p className="md:text-lg font-semibold">
                Start Date:
                {' '}
                <span className="animate-pulse2">{reservation.start_date}</span>
              </p>
              <p className="md:text-lg font-semibold">
                End Date:
                {' '}
                <span className="animate-pulse">{reservation.end_date}</span>
              </p>
            </div>
            <p className="md:text-md">
              Home:
              {' '}
              <span className="md:font-semibold">{getHomeName(reservation.home_id)}</span>
            </p>
            <button
              type="button"
              className="w-full md:w-auto py-2 px-4 md:text-md md:ml-auto text-red-500 bg-transparent border border-red-500 rounded hover:text-red-700 hover:bg-red-100 transition duration-300"
              onClick={() => handleDelete(reservation.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
