class Api::V1::HomesController < ApplicationController
  def index
    @homes = Home.all
    render json: @homes
  end

  def show
    @home = Home.find_by(id: params[:id])

    if @home
      render json: @home
    else
      render json: {
        error: 'Home not found'
      }, status: :not_found
    end
  end

  def create
    @home = Home.new(home_params)
    if @home.save
      render json: @home, status: :created
    else
      render json: {
        error: 'Error creating home ...'
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @home = Home.find_by(id: params[:id])

    if @home
      @home.destroy
      head :no_content
    else
      render json: {
        error: 'Home not found'
      }, status: :not_found
    end
  end


  private

  def home_params
    params.require(:home).permit(:name, :price, :description, :image)
  end
end
