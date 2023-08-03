import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReservations } from "../redux/ReservationsSlice";

export default function Reservations() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  console.log(reservations);
  useEffect(() => {
    dispatch(fetchAllReservations());
  }, [dispatch]);

  return (
    <div>
      <h1>Reservations </h1>
    </div>
  );
}
