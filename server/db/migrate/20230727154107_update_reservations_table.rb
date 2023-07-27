class UpdateReservationsTable < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :reservations, column: :cities_id
    remove_foreign_key :reservations, column: :homes_id
    
    remove_column :reservations, :cities_id
    remove_column :reservations, :homes_id

    add_column :reservations, :city_id, :bigint, null: false
    add_column :reservations, :home_id, :bigint, null: false

    add_foreign_key :reservations, :cities, column: :city_id
    add_foreign_key :reservations, :homes, column: :home_id
  end
end
