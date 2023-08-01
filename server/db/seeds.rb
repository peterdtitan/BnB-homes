# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# Seed data for Cities
5.times do |n|
    City.create(name: "Sample City #{n + 1}")
  end
  
  # Seed data for Homes
  5.times do |n|
    Home.create(
      name: "Cozy Cottage #{n + 1}",
      price: 100 + (n * 50),
      image: "https://images.unsplash.com/photo-1603862026184-14a7f7b91026?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      description: "A beautiful cottage in the heart of the city."
    )
  end
  
  # Seed data for Users
  5.times do |n|
    User.create(
      username: "user#{n + 1}",
      email: "user#{n + 1}@example.com",
      password: "password"
    )
  end
  
  # Seed data for Reservations
  cities = City.all
  homes = Home.all
  users = User.all
  
  5.times do |n|
    Reservation.create(
      start_date: Date.today + n.days,
      end_date: Date.today + (n + 7).days,
      city_id: cities.sample.id,
      home_id: homes.sample.id,
      user_id: users.sample.id
    )
  end
  