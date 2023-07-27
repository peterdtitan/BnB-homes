class Api::V1::HomesController < ApplicationController
  def index
    @homes = Home.all
    render json: @homes
  end

  def create; end

  def destroy; end
end
