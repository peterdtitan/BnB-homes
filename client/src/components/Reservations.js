import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReservations } from "../redux/ReservationsSlice";

export default function Reservations() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(fetchAllReservations());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <div className="grid grid-cols-1 gap-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="p-4 bg-white rounded-md shadow-md flex flex-col items-center justify-center"
          >
            <p className="text-lg font-semibold">
              Start Date: <span className="animate-pulse2">{reservation.start_date}</span>
            </p>
            <p className="text-lg font-semibold">
              End Date: <span className="animate-pulse">{reservation.end_date}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
