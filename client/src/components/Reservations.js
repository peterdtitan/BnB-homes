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
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
