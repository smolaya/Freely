class Event < ApplicationRecord
  geocoded_by :address
  after_validation :geocode
  
  scope :search, -> (term)  {
                              where("name ILIKE :term or description ILIKE :term",
                              term: "%#{term}%")
                            }
  scope :before, -> (end_date) { where("datetime_end <= ?", end_date) }
  scope :after, -> (start_date) { where("datetime_start >= ?", start_date) }
end
