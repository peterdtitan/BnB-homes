# spec/requests/api/v1/reservations_spec.rb
require 'rails_helper'
RSpec.describe "Api::V1::ReservationsController", type: :request do
  describe "GET /api/v1/reservations" do
    it "returns a list of reservations with JSON response" do

      reservations = FactoryBot.create_list(:reservation, 5)

      get "/api/v1/reservations"

      expect(response).to have_http_status(:ok)
 
      json_response = JSON.parse(response.body)
    
      expect(json_response).to be_an(Array)
      expect(json_response.length).to eq(5)
    
      reservations.each_with_index do |reservation, index|
        expect(json_response[index]["id"]).to eq(reservation.id)
        expect(json_response[index]["start_date"]).to eq(reservation.start_date.to_s)
        expect(json_response[index]["end_date"]).to eq(reservation.end_date.to_s)
        expect(json_response[index]["city_id"]).to eq(reservation.city_id)
        expect(json_response[index]["home_id"]).to eq(reservation.home_id)
        expect(json_response[index]["user_id"]).to eq(reservation.user_id)
      end
    end
  end
  describe "GET /api/v1/reservations/:id" do
    it "returns a single reservation with JSON response" do

      reservation = FactoryBot.create(:reservation)

      get "/api/v1/reservations/#{reservation.id}"

      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body)

      expect(json_response["id"]).to eq(reservation.id)
      expect(json_response["start_date"]).to eq(reservation.start_date.to_s)
      expect(json_response["end_date"]).to eq(reservation.end_date.to_s)
      expect(json_response["city_id"]).to eq(reservation.city_id)
      expect(json_response["home_id"]).to eq(reservation.home_id)
      expect(json_response["user_id"]).to eq(reservation.user_id)
    end
  end
  describe "POST /api/v1/reservations" do
    it "creates a new reservation with JSON response" do
      user = FactoryBot.create(:user)
      home = FactoryBot.create(:home)
      city = FactoryBot.create(:city)
  
      reservation_data = {
        start_date: Date.today,
        end_date: Date.today + 7.days,
        city_id: city.id,
        home_id: home.id,
        user_id: user.id
      }
  
      post "/api/v1/reservations", params: { reservation: reservation_data }
  
      expect(response).to have_http_status(:ok)
  
      json_response = JSON.parse(response.body)
  
      expect(json_response["start_date"]).to eq(reservation_data[:start_date].to_s)
      expect(json_response["end_date"]).to eq(reservation_data[:end_date].to_s)
      expect(json_response["city_id"]).to eq(reservation_data[:city_id])
      expect(json_response["home_id"]).to eq(reservation_data[:home_id])
      expect(json_response["user_id"]).to eq(reservation_data[:user_id])
    end
  end
  
  describe "DELETE /api/v1/reservations/:id" do
    it "deletes a reservation with JSON response" do

      reservation = FactoryBot.create(:reservation)

      delete "/api/v1/reservations/#{reservation.id}"

      expect(response).to have_http_status(:no_content)

      expect { reservation.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end