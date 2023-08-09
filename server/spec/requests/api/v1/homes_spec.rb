require 'swagger_helper'

RSpec.describe Api::V1::HomesController, type: :request do
  path '/api/v1/homes' do
    get 'Retrieve all homes' do
      tags 'Homes'
      produces 'application/json'
      response '200', 'Homes found' do
        schema type: :array,
               items: {
                 properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   price: { type: :number },
                   image: { type: :string },
                   description: { type: :string }
                 },
                 required: %w[id name price image description]
               }

        run_test! do
          # Create some sample services for testing
          Home.create!(id: 2, name: 'Home 1', price: 10, image: 'image1.jpg', description: 'description 1')
          Home.create!(id: 3, name: 'Home 2', price: 15, image: 'image2.jpg', description: 'description 2')

          # Make a request to retrieve all services
          get '/api/v1/homes'

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          homes = JSON.parse(response.body)
          expect(homes).to be_an(Array)
          expect(homes.length).to eq(2)
          expect(homes[0]).to include('id', 'name', 'price', 'image', 'description')
        end
      end
    end

    post 'Create a homes' do
      tags 'Homes'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :home, in: :body, schema: {
        type: :object,
        properties: {
          id: { type: :integer },
          name: { type: :string },
          price: { type: :number },
          image: { type: :string },
          description: { type: :string }
        },
        required: %w[id name price image description]
      }

      response '201', 'Home created' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 name: { type: :string },
                 price: { type: :number },
                 image: { type: :string },
                 description: { type: :string }
               },
               required: %w[id name price image description]

        let(:home) do
          {
            id: 1,
            name: 'New home',
            price: 20,
            image: 'new_image.jpg',
            description: 'New Service Details'
          }
        end

        run_test! do
          # Make a request to create a service
          post '/api/v1/homes', params: { home: home }

          # Assert the response status code
          expect(response).to have_http_status(:created)

          # Assert the response body against the defined schema
          created_home = JSON.parse(response.body)
          expect(created_home).to include('id', 'name', 'price', 'image', 'description')
        end
      end

      response '422', 'Error creating home' do
        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: ['error']

        let(:home) { { name: 'Invalid Service', price: 'invalid' } }  # Fix the param name

        run_test! do
          # Make a request to create a home with invalid data
          post '/api/v1/homes', params: { home: home }  # Provide correct params

          # Assert the response status code
          expect(response).to have_http_status(422)

          # Assert the response body against the defined schema
          error_response = JSON.parse(response.body)
          expect(error_response).to include('error')
        end
      end
    end
  end

  path '/api/v1/homes/{id}' do
    parameter name: :id, in: :path, type: :integer, required: true

    get 'Retrieve a home' do
      tags 'Homes'
      produces 'application/json'
      response '200', 'Homes found' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 name: { type: :string },
                 price: { type: :number },
                 image: { type: :string },
                 description: { type: :string }
               },
               required: %w[id name price image description]

        let(:id) do
          Home.create(name: 'Home 1', price: 10, image: 'image1.jpg', description: 'description 1').id
        end

        run_test! do
          # Make a request to retrieve a service
          get "/api/v1/homes/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          home = JSON.parse(response.body)
          expect(home).to include('id', 'name', 'price', 'image', 'description')
        end
      end

      response '404', 'Homes not found' do
        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: ['error']

        let(:id) { 999 }

        run_test! do
          # Make a request to retrieve a non-existing service
          get "/api/v1/homes/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(:not_found)

          # Assert the response body against the defined schema
          error_response = JSON.parse(response.body)
          expect(error_response).to include('error')
        end
      end
    end

    delete 'Delete a home' do
      tags 'Homes'
      produces 'application/json'
      response '204', 'Homes deleted' do
        let(:id) do
          Home.create(name: 'Home 1', price: 10, image: 'image1.jpg', description: 'description 1').id
        end

        run_test! do
          # Make a request to delete a service
          delete "/api/v1/homes/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(204)

          # Assert that the service is deleted
          expect(Home.find_by(id:)).to be_nil
        end
      end

      response '404', 'Home not found' do
        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: ['error']

        let(:id) { 999 }

        run_test! do
          # Make a request to delete a non-existing service
          delete "/api/v1/homes/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(404)

          # Assert the response body against the defined schema
          error_response = JSON.parse(response.body)
          expect(error_response).to include('error')
        end
      end
    end
  end
end
