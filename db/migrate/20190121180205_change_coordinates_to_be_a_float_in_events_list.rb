class ChangeCoordinatesToBeAFloatInEventsList < ActiveRecord::Migration[5.2]
  def change
    change_column :events_lists, :latitude, :float
    change_column :events_lists, :longitude, :float
  end
end
