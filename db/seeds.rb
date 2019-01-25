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

  50.times do |n|
    name = Faker::Lorem.word
    address = "#{n+1}00 Biscayne Boulevard, Miami Florida"
    datetime_start = Faker::Time.forward(25, :evening)
    datetime_end = datetime_start + [30, 60, 120].sample.minutes
    description = Faker::Lorem.paragraph
    category = Faker::Lorem.word

    # Add event to event_list
    events_list << [name, address, datetime_start, datetime_end, description, category]
  end

  events_list.each do |name, address, datetime_start, datetime_end, description, category|
    Event.create(name: name, address: address, datetime_start: datetime_start, datetime_end: datetime_end, description: description, category: category)
  end

  require 'uri'

  url = URI::parse("https://www.eventbriteapi.com/v3/events/search/?location.latitude=25.8014116&location.longitude=-80.1990871&location.within=20km&expand=venue,category&token=N3UJC5A67XVRFFOQQBCG")

  response = HTTParty.get(
    url,
    headers: {
    'Authorization' => 'Bearer N3UJC5A67XVRFFOQQBCG'
    }
  )

  events = JSON.parse(response.body)["events"]
  events = events.select{ |event| event["is_free"] }
  

  #Events from Eventbrite  
  free_events = []

  events.each { |event| free_events << { name: event["name"]["text"], address: event["venue"]["address"]["localized_address_display"], datetime_start: event["start"]["local"], datetime_end: event["end"]["local"], description: event["description"]["text"], category: event.dig("category", "name") || "Free Event" 
  } }

  free_events.each do |name, address, datetime_start, datetime_end, description, category|
    Event.create(name: name, address: address, datetime_start: datetime_start, datetime_end: datetime_end, description: description, category: category)
  end



  
  puts events_list.count
  puts free_events.count



