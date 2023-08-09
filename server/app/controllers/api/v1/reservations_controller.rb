class Api::V1::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.all
    render json: @reservations
  end

  def show
    @reservation = Reservation.find(params[:id])
    render json: @reservation
  end

  def create
    puts "Received parameters: #{params.inspect}"
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      render json: @reservation, status: 201
    else
      render json: {
        error: 'Error creating reservation ...'
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.destroy
    head :no_content
  end

  private

  def reservation_params
    params.require(:reservation).permit(:start_date, :end_date, :city_id, :home_id)
  end
end
