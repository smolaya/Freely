class Result < ApplicationRecord
  validates :street, presence: true
  geocoded_by :address
  after_validation :geocode

  def address
    [street, city, state, zip].compact.join(', ')
  end
end
