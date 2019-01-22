class ChangeCoordinatesToBeAFloatInEventsList < ActiveRecord::Migration[5.2]
  def change
    change_column :events, :latitude, :float
    change_column :events, :longitude, :float
  end
end
