# app/controllers/api/v1/city_controller.rb
class Api::V1::CityController < ApplicationController
  def index
    @cities = City.all
    render json: @cities
  end

  def create 
    @city = City.new(city_params)
    if @city.save
      render json: @city, status: :created
    else
      render json: { error: "Error creating city ..." }, status: :unprocessable_entity
    end
  end

  private

  def city_params
    params.require(:city).permit(:name)
  end
end
