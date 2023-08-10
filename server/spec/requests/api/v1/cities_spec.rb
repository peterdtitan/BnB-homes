require 'swagger_helper'

RSpec.describe Api::V1::CityController, type: :request do
  path '/api/v1/city' do
    get 'Retrieve all cities' do
      tags 'City'
      produces 'application/json'
      response '200', 'City found' do
        schema type: :array,
               items: {
                 properties: {
                   id: { type: :integer },
                   name: { type: :string }
                 },
                 required: %w[id name]
               }

        run_test! do
          # Create some sample locations for testing
          City.create!(name: 'City 1')
          City.create!(name: 'City 2')

          # Make a request to retrieve all locations
          get '/api/v1/city'

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          cities = JSON.parse(response.body)
          expect(cities).to be_an(Array)
          expect(cities.length).to eq(2)
          expect(cities[0]).to include('id', 'name')
        end
      end
    end

    post 'Create a city' do
      tags 'City'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :city, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        },
        required: ['name']
      }

      response '201', 'City created' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 name: { type: :string }
               },
               required: %w[id name]

        let(:city) { { name: 'New city' } }

        run_test! do
          # Make a request to create a location
          post '/api/v1/city', params: { city: }

          # Assert the response status code
          expect(response).to have_http_status(:created)

          # Assert the response body against the defined schema
          created_cities = JSON.parse(response.body)
          expect(created_cities).to include('id', 'name')
        end
      end

      response '422', 'Error creating location' do
        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: ['error']

        let(:city) { { name: nil } }

        run_test! do
          # Make a request to create a location with invalid data
          post '/api/v1/city', params: { city: }

          # Assert the response status code
          expect(response).to have_http_status(422)

          # Assert the response body against the defined schema
          error_response = JSON.parse(response.body)
          expect(error_response).to include('error')
        end
      end
    end
  end
end
