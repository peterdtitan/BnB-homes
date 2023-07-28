# spec/requests/api/v1/city_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::V1::CityController, type: :request do
  describe "GET /api/v1/city" do
    it "returns a list of cities with JSON response" do
      # Create some cities using the factory or any other method
      cities = FactoryBot.create_list(:city, 5)

      # Make a GET request to the index action of the CityController
      get "/api/v1/city"

      # Expect a successful response (HTTP status code 200)
      expect(response).to have_http_status(:ok)

      # Parse the JSON response body
      json_response = JSON.parse(response.body)

      # Expect the JSON response to be an array of cities
      expect(json_response).to be_an(Array)
      expect(json_response.length).to eq(5)

      # Expect each item in the JSON response to have the expected attributes
      cities.each_with_index do |city, index|
        expect(json_response[index]["id"]).to eq(city.id)
        expect(json_response[index]["name"]).to eq(city.name)
      end
    end
  end

  describe "POST /api/v1/city" do
    it "creates a new city with JSON response" do
      # Parameters for the new city
      city_params = { city: { name: "New City" } }

      # Make a POST request to the create action of the CityController
      post "/api/v1/city", params: city_params

      # Expect a successful response (HTTP status code 201)
      expect(response).to have_http_status(:created)

      # Parse the JSON response body
      json_response = JSON.parse(response.body)

      # Expect the JSON response to have the expected attributes for the new city
      expect(json_response["id"]).to be_present
      expect(json_response["name"]).to eq("New City")
    end

    it "returns an error for invalid city parameters" do
      # Invalid parameters for the new city (missing name)
      invalid_params = { city: { invalid_key: "Invalid Value" } }

      # Make a POST request to the create action of the CityController with invalid parameters
      post "/api/v1/city", params: invalid_params

      # Expect an error response (HTTP status code 422)
      expect(response).to have_http_status(:unprocessable_entity)

      # Parse the JSON response body
      json_response = JSON.parse(response.body)

      # Expect the JSON response to have an error message
      expect(json_response["error"]).to eq("Error creating city ...")
    end
  end
end
