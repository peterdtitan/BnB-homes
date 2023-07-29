# spec/requests/api/v1/users_spec.rb
require 'rails_helper'
RSpec.describe "Api::V1::UsersController", type: :request do
  describe "GET /api/v1/users" do
    it "returns a list of users with JSON response" do
      # Create some users using the factory
      users = FactoryBot.create_list(:user, 5)
      # Make a GET request to the index action of the UsersController
      get "/api/v1/users"
      # Expect a successful response (HTTP status code 200)
      expect(response).to have_http_status(:ok)
      # Parse the JSON response body
      json_response = JSON.parse(response.body)
      # Expect the JSON response to be an array of users
      expect(json_response).to be_an(Array)
      expect(json_response.length).to eq(5)
      # Expect each item in the JSON response to have the expected attributes
      users.each_with_index do |user, index|
        expect(json_response[index]["id"]).to eq(user.id)
        expect(json_response[index]["username"]).to eq(user.username)
        expect(json_response[index]["email"]).to eq(user.email)
      end
    end
  end
end