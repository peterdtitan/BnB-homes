class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.date :start_date
      t.date :end_date
      t.references :cities, null: false, foreign_key: true
      t.references :homes, null: false, foreign_key: true

      t.timestamps
    end
  end
end
