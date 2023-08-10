require 'swagger_helper'

RSpec.describe Users::SessionsController, type: :request do
  path '/users/login' do
    post 'User Sign In' do
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

      response '200', 'Logged in successfully' do
        schema type: :object,
               properties: {
                 status: {
                   type: :object,
                   properties: {
                     code: { type: :integer },
                     message: { type: :string }
                   },
                   required: %w[code message]
                 },
                 data: {
                   type: :object,
                   properties: {
                     id: { type: :integer },
                     name: { type: :string },
                     password: {type: :string}
                   },
                   required: %w[id name password]
                 }
               },
               required: %w[status data]

        run_test! do
          # Create a sample user for testing
          User.create!(name: 'John Doe', password: 'password')

          # Make a request to sign in
          post '/users/login', params: { user: { name: 'john@example.com', password: 'password' } }

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          json_response = JSON.parse(response.body)
          expect(json_response).to include('status', 'data')
          expect(json_response['status']).to include('code', 'message')
          expect(json_response['data']).to include('id', 'name', 'password')
        end
      end

      response '401', "Couldn't find an active session" do
        schema type: :object,
               properties: {
                 status: { type: :integer },
                 message: { type: :string }
               },
               required: %w[status message]

        run_test! do
          # Make a request to sign in without valid credentials
          post '/users/login', params: { user: { name: 'invalid@example.com', password: 'invalidpassword' } }

          # Assert the response status code
          expect(response).to have_http_status(:unauthorized)

          # Assert the response body against the defined schema
          json_response = JSON.parse(response.body)
          expect(json_response).to include('status', 'message')
        end
      end
    end
  end
  path '/users/logout' do
    delete 'User Sign Out' do
      tags 'Users'
      produces 'application/json'
      security [bearer_auth: []]

      response '200', 'Logged out successfully' do
        schema type: :object,
               properties: {
                 status: { type: :integer },
                 message: { type: :string }
               },
               required: %w[status message]

        run_test! do
          # Create a sample user for testing
          User.create!(name: 'John Doe', password: 'password')

          # Authenticate the user
          post '/users/login', params: { user: { name: 'john@example.com', password: 'password' } }
          auth_header = response.headers['Authorization']

          # Make a request to sign out
          delete '/users/logout', headers: { Authorization: auth_header }

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          json_response = JSON.parse(response.body)
          expect(json_response).to include('status', 'message')
        end
      end
    end
  end
end