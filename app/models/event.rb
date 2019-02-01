class Event < ApplicationRecord
  belongs_to :user

  scope :ordered, ->  { order(datetime_start: :asc) }
  scope :between, ->  (start_date, end_date){
                        where("datetime_start >= ? and datetime_start <= ?",
                        start_date, end_date)
                      }
end
