# spec/requests/api/v1/reservations_spec.rb
require 'swagger_helper'

RSpec.describe Api::V1::ReservationsController, type: :request do
  path '/api/v1/reservations' do
    get 'Retrieve all reservations' do
      tags 'Reservations'
      produces 'application/json'
      response '200', 'Reservations found' do
        schema type: :array,
               items: {
                 properties: {
                   id: { type: :integer },
                   start_date: { type: :string, format: 'date-time' },
                   end_date: { type: :string, format: 'date-time' }
                   city_id: { type: :integer },
                   home_id: { type: :integer },
                 },
                 required: %w[id city_id home_id start_date end_date]
               }

        run_test! do
          # Create some sample reservations for testing
          Reservation.create!(start_date: DateTime.now, 
                              end_date: DateTime.now + 1.day, city_id: 1, home_id: 1)
          Reservation.create!(start_date: DateTime.now,
                              end_date: DateTime.now + 1.day, city_id: 2, home_id: 2)

          # Make a request to retrieve all reservations
          get '/api/v1/reservations'

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          reservations = JSON.parse(response.body)
          expect(reservations).to be_an(Array)
          expect(reservations.length).to eq(2)
          expect(reservations[0]).to include('id', 'start_date', 'end_date', 'city_id', 'home_id')
        end
      end
    end

    post 'Create a reservation' do
      tags 'Reservations'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :reservation, in: :body, schema: {
        type: :object,
        properties: {
          start_date: { type: :string, format: 'date-time' },
          end_date: { type: :string, format: 'date-time' },
          city_id: { type: :integer },
          home_id: { type: :integer }
        },
        required: %w[start_date end_date city_id home_id]
      }

      response '200', 'Reservation created' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 start_date: { type: :string, format: 'date-time' },
                 end_date: { type: :string, format: 'date-time' },
                 city_id: { type: :integer },
                 home_id: { type: :integer }
               },
               required: %w[id start_date end_date city_id home_id]

        let(:reservation) do
          {
            start_date: DateTime.now,
            end_date: DateTime.now + 1.day,
            city_id: 1,
            home_id: 1
          }
        end

        run_test! do
          # Make a request to create a reservation
          post '/api/v1/reservations', params: { reservation: reservation }

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          created_reservation = JSON.parse(response.body)
          expect(created_reservation).to include('id', 'start_date', 'end_date', 'city_id', 'home_id')
        end
      end
    end
  end

  path '/api/v1/reservations/{id}' do
    get 'Retrieve a reservation' do
      tags 'Reservations'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true

      response '200', 'Reservation found' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 city_id: { type: :integer },
                 home_id: { type: :integer },
                 start_date: { type: :string, format: 'date-time' },
                 end_date: { type: :string, format: 'date-time' }
               },
               required: %w[id city_id user_id home_id start_date end_date]

        let(:id) do
          Reservation.create(start_date: DateTime.now, end_date: DateTime.now + 1.day, 
            city_id: 1, home_id: 1).id
        end

        run_test! do
          # Make a request to retrieve a reservation
          get "/api/v1/reservations/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(:ok)

          # Assert the response body against the defined schema
          reservation = JSON.parse(response.body)
          expect(reservation).to include('id', 'start_date', 'end_date', 'city_id', 'home_id' )
        end
      end

      response '404', 'Reservation not found' do
        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: ['error']

        let(:id) { 999 }

        run_test! do
          # Make a request to retrieve a non-existing reservation
          get "/api/v1/reservations/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(:not_found)

          # Assert the response body against the defined schema
          error_response = JSON.parse(response.body)
          expect(error_response).to include('error')
        end
      end
    end

    delete 'Delete a reservation' do
      tags 'Reservations'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true

      response '204', 'Reservation deleted' do
        let(:id) do
          Reservation.create(start_date: DateTime.now,end_date: DateTime.now + 1.day,
            city_id: 1, home_id: 1).id
        end

        run_test! do
          # Make a request to delete a reservation
          delete "/api/v1/reservations/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(:no_content)

          # Assert that the reservation is deleted
          expect(Reservation.find_by(id:)).to be_nil
        end
      end

      response '404', 'Reservation not found' do
        schema type: :object,
               properties: {
                 error: { type: :string }
               },
               required: ['error']

        let(:id) { 999 }

        run_test! do
          # Make a request to delete a non-existing reservation
          delete "/api/v1/reservations/#{id}"

          # Assert the response status code
          expect(response).to have_http_status(:not_found)

          # Assert the response body against the defined schema
          error_response = JSON.parse(response.body)
          expect(error_response).to include('error')
        end
      end
    end
  end
end
