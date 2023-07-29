require 'rails_helper'

RSpec.describe "Homes API", type: :request do
  describe "GET /homes" do
    it "returns a list of homes with JSON response" do
      # Create some homes using the factory
      homes = FactoryBot.create_list(:home, 5)

      # Make a GET request to the index action of the HomesController
      get "/api/v1/homes"

      # Expect a successful response (HTTP status code 200)
      expect(response).to have_http_status(:ok)

      # Parse the JSON response body
      json_response = JSON.parse(response.body)

      # Expect the JSON response to be an array of homes
      expect(json_response).to be_an(Array)
      expect(json_response.length).to eq(5)

      # Expect each item in the JSON response to have the expected attributes
      homes.each_with_index do |home, index|
        expect(json_response[index]["id"]).to eq(home.id)
        expect(json_response[index]["name"]).to eq(home.name)
        expect(json_response[index]["price"]).to eq(home.price)
        expect(json_response[index]["description"]).to eq(home.description)
        expect(json_response[index]["image"]).to eq(home.image)
      end
    end

    it "returns a single home with JSON response" do
      # Create a home using the factory
      home = FactoryBot.create(:home)

      # Make a GET request to the show action of the HomesController
      get "/api/v1/homes/#{home.id}"

      # Expect a successful response (HTTP status code 200)
      expect(response).to have_http_status(:ok)

      # Parse the JSON response body
      json_response = JSON.parse(response.body)

      # Expect the JSON response to have the expected attributes for the home
      expect(json_response["id"]).to eq(home.id)
      expect(json_response["name"]).to eq(home.name)
      expect(json_response["price"]).to eq(home.price)
      expect(json_response["description"]).to eq(home.description)
      expect(json_response["image"]).to eq(home.image)
    end
  end
end
