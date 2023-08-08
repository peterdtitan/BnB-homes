require 'swagger_helper'

RSpec.describe Users::SessionsController, type: :request do
  path '/login' do
    post 'User Sign In' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :users, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: %w[email password]
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
                     username: { type: :string },
                     email: { type: :string }
                   },
                   required: %w[id username email]
                 }
               },
               required: %w[status data]

        run_test! do
          # Create a sample user for testing
          User.create!(username: 'John Doe', email: 'john@example.com', password: 'password')

          # Make a request to sign in
          post '/login', params: { user: { email: 'john@example.com', password: 'password' } }

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          json_response = JSON.parse(response.body)
          expect(json_response).to include('status', 'data')
          expect(json_response['status']).to include('code', 'message')
          expect(json_response['data']).to include('id', 'username', 'email')
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
          post '/login', params: { users: { email: 'invalid@example.com', password: 'invalidpassword' } }

          # Assert the response status code
          expect(response).to have_http_status(:unauthorized)

          # Assert the response body against the defined schema
          json_response = JSON.parse(response.body)
          expect(json_response).to include('status', 'message')
        end
      end
    end
  end

  path '/logout' do
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
          User.create!(username: 'John Doe', email: 'john@example.com', password: 'password')

          # Authenticate the user
          post '/login', params: { users: { email: 'john@example.com', password: 'password' } }
          auth_header = response.headers['Authorization']

          # Make a request to sign out
          delete '/logout', headers: { Authorization: auth_header }

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