require 'swagger_helper'

RSpec.describe Api::V1::UsersController, type: :request do
  path '/api/v1/users' do
    get 'Retrieve all users' do
      tags 'Users'
      produces 'application/json'
      response '200', 'Users found' do
        schema type: :array,
               items: {
                 properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   password: { type: :string }
                 },
                 required: %w[id name password]
               }

        run_test! do
          # Create some sample users for testing
          User.create!(name: 'John Doe', password: 'password')
          User.create!(name: 'Jane Smith', password: 'password')

          # Make a request to the '/api/v1/users' endpoint
          get '/api/v1/users'

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          users = JSON.parse(response.body)
          expect(users).to be_an(Array)
          expect(users.length).to eq(2)
          expect(users[0]).to include('id', 'name', 'password')
        end
      end
    end

    post 'Create a user' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          password: { type: :string }
        },
        required: %w[name password]
      }

      response '201', 'User created' do
        run_test! do
          user_params = {
            name: 'New User',
            password: 'newpassword'
          }

          # Make a request to the '/api/v1/users' endpoint
          post '/api/v1/users', params: { user: user_params }

          # Assert the response status code
          expect(response).to have_http_status(:created)

          # Assert the response body against the expected user attributes
          user = JSON.parse(response.body)
          expect(user).to include('id', 'name')
          
        end
      end
    end
  end
end
