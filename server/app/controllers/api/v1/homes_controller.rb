class Api::V1::HomesController < ApplicationController
  def index
    @homes = Home.all
    render json: @homes
  end

  def show
    @home = Home.find(params[:id])
    render json: @home
  end

  def create
    @home = Home.new(home_params)
    if @home.save
      render json: @home, status: 200
    else
      render json: {
        error: 'Error creating home ...'
      }
    end
  end

  def destroy
    @home = Home.find(params[:id])
    @home.destroy
    head :no_content
  end

  private

  def home_params
    params.require(:home).permit(:name, :price, :description, :image)
  end
end
