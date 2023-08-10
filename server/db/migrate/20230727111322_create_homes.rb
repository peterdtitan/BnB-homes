class CreateHomes < ActiveRecord::Migration[7.0]
  def change
    create_table :homes do |t|
      t.string :name
      t.float :price
      t.string :image
      t.string :description

      t.timestamps
    end
  end
end
