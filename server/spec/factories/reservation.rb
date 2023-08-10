FactoryBot.define do
  factory :reservation do
    start_date { Date.today }
    end_date { Date.today + 7.days }
    association :city
    association :home
    association :user
  end
end
