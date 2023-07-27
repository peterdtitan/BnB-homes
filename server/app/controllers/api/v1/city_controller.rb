class Api::V1::CityController < ApplicationController
  def index
    @city = City.all
    render json: @city
  end
end
