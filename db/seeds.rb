# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_list = [
  [ "email@example.com", "Password"],
  [ "mortimer@snerd.net", "Secret"]
]

50.times do
  name = Faker::Internet.email
  password = Faker::Internet.password(10)

  # Add user to user_list
  user_list << [ Faker::Internet.email, password]
end

user_list.each do |email, password|
  User.create(email: email, password: password)
end

events_list = [
]

50.times do
  name = Faker::Lorem.word
  latitude = Faker::Address.latitude
  longitude = Faker::Address.longitude
  address = Faker::Address.street_address
  datetime_start = Faker::Time.forward(25, :evening)
  description = Faker::Lorem.paragraph
  category = Faker::Lorem.word
  

  # Add event to event_list
  events_list << [ Faker::Lorem.word, Faker::Address.latitude, Faker::Address.longitude, Faker::Address.street_address, Faker::Time.forward(25, :evening),Faker::Lorem.paragraph, Faker::Lorem.word]
end

events_list.each do |name, latitude, longitude, address, datetime_start, description, category|
  EventsList.create(name: name, latitude: latitude, longitude: longitude, address: address, datetime_start: datetime_start, description: description, category: category)
end