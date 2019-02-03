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
  #RailsDB
  events_list = []

  require 'uri'

  