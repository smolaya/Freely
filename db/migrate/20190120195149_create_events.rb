class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.integer :latitude
      t.integer :longitude
      t.string :address
      t.datetime :datetime_start
      t.datetime :datetime_end
      t.string :description
      t.string :category

      t.timestamps
    end
  end
end
