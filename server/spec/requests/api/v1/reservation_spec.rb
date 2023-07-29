# spec/requests/api/v1/reservations_spec.rb
require 'rails_helper'
RSpec.describe "Api::V1::ReservationsController", type: :request do
  describe "GET /api/v1/reservations" do
    it "returns a list of reservations with JSON response" do
      # Create some reservations using the factory
      reservations = FactoryBot.create_list(:reservation, 5)
      # Make a GET request to the index action of the ReservationsController
      get "/api/v1/reservations"
      # Expect a successful response (HTTP status code 200)
      expect(response).to have_http_status(:ok)
      # Parse the JSON response body
      json_response = JSON.parse(response.body)
      # Expect the JSON response to be an array of reservations
      expect(json_response).to be_an(Array)
      expect(json_response.length).to eq(5)
      # Expect each item in the JSON response to have the expected attributes
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
      # Create a reservation using the factory
      reservation = FactoryBot.create(:reservation)
      # Make a GET request to the show action of the ReservationsController
      get "/api/v1/reservations/#{reservation.id}"
      # Expect a successful response (HTTP status code 200)
      expect(response).to have_http_status(:ok)
      # Parse the JSON response body
      json_response = JSON.parse(response.body)
      # Expect the JSON response to have the expected attributes for the reservation
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
      # Create a user and a home to associate with the reservation
      user = FactoryBot.create(:user)
      home = FactoryBot.create(:home)
      # Data for the new reservation
      reservation_data = {
        reservation: {
          start_date: Date.today,
          end_date: Date.today + 7.days,
          city_id: home.city_id,
          home_id: home.id,
          user_id: user.id
        }
      }
      # Make a POST request to the create action of the ReservationsController
      post "/api/v1/reservations", params: reservation_data
      # Expect a successful response (HTTP status code 200)
      expect(response).to have_http_status(:ok)
      # Parse the JSON response body
      json_response = JSON.parse(response.body)
      # Expect the JSON response to have the expected attributes for the new reservation
      expect(json_response["start_date"]).to eq(reservation_data[:reservation][:start_date].to_s)
      expect(json_response["end_date"]).to eq(reservation_data[:reservation][:end_date].to_s)
      expect(json_response["city_id"]).to eq(reservation_data[:reservation][:city_id])
      expect(json_response["home_id"]).to eq(reservation_data[:reservation][:home_id])
      expect(json_response["user_id"]).to eq(reservation_data[:reservation][:user_id])
    end
    it "returns an error for invalid reservation parameters" do
      # Invalid reservation data with missing required fields
      invalid_reservation_data = {
        reservation: {
          start_date: Date.today,
          end_date: nil, # Invalid, missing end_date
          city_id: 1,
          home_id: 1,
          user_id: 1
        }
      }
      # Make a POST request to the create action of the ReservationsController
      post "/api/v1/reservations", params: invalid_reservation_data
      # Expect an error response (HTTP status code 422 Unprocessable Entity)
      expect(response).to have_http_status(:unprocessable_entity)
      # Parse the JSON response body
      json_response = JSON.parse(response.body)
      # Expect the JSON response to have an error message
      expect(json_response["error"]).to eq("Error creating reservation ...")
    end
  end
  describe "DELETE /api/v1/reservations/:id" do
    it "deletes a reservation with JSON response" do
      # Create a reservation using the factory
      reservation = FactoryBot.create(:reservation)
      # Make a DELETE request to the destroy action of the ReservationsController
      delete "/api/v1/reservations/#{reservation.id}"
      # Expect a successful response (HTTP status code 204 No Content)
      expect(response).to have_http_status(:no_content)
      # Check if the reservation was actually deleted from the database
      expect { reservation.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end