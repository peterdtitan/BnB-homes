FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "username#{n}" }
    password { 'password123' }
  end
end
