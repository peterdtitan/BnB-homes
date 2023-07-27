class Api::V1::CityController < ApplicationController
  def index
    @city = City.all
    render json: @city
  end

  def create 
    @city = City.create(city_params)
    if city.save
     render json: @city, status: 200
    else
      render json: {error: "Error creating city ..."}
    end
  end

  def city_params
    params.require(:city).permit(:name)
  end
end
