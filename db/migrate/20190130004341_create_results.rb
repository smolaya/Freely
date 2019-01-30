class CreateResults < ActiveRecord::Migration[5.2]
  def change
    create_table :results do |t|
      t.string :street
      t.string :city
      t.string :state
      t.string :zip
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
